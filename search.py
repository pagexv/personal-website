import asyncio
import json
import os
import time
from datetime import datetime, timedelta
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import schedule
from urllib.parse import urlparse
from playwright.async_api import async_playwright
from bs4 import BeautifulSoup
import cloudscraper

SESSION_FILE = 'playwright_session.json'
SEARCH_HISTORY_FILE = 'search_history.json'
EMAIL_SENDER = 'colinqu2273@gmail.com'
EMAIL_RECEIVER = 'colinqu2273@gmail.com'
EMAIL_PASSWORD = 'guqj bxcz kbvl zpiv'
SMTP_SERVER = 'smtp.gmail.com'
SMTP_PORT = 587

async def save_context(context):
    storage = await context.storage_state()
    with open(SESSION_FILE, 'w') as f:
        json.dump(storage, f)

async def load_context(browser):
    if os.path.exists(SESSION_FILE):
        with open(SESSION_FILE, 'r') as f:
            storage = json.load(f)
        context = await browser.new_context(storage_state=storage)
    else:
        context = await browser.new_context()
    return context

async def fetch_playwright_content(url, username=None, password=None):
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)  # Use headless=True for production
        context = await load_context(browser)
        page = await context.new_page()
        
        if not os.path.exists(SESSION_FILE) and username and password:
            # Navigate to LinkedIn login page
            await page.goto('https://www.linkedin.com/login')
            await page.fill('input[name="session_key"]', username)
            await page.fill('input[name="session_password"]', password)
            await page.click('button[type="submit"]')
            await page.wait_for_url('https://www.linkedin.com/feed/', timeout=60000)
            await save_context(context)

        await page.goto(url, wait_until='networkidle')
        
        # Wait for the job cards to load
        await page.wait_for_selector('div.job-card-list__entity-lockup', timeout=60000)
        
        html_content = await page.content()
        await browser.close()
        return html_content

def fetch_cloudscraper_content(url):
    scraper = cloudscraper.create_scraper()
    response = scraper.get(url)
    if response.status_code == 200:
        return response.text
    return None

def parse_indeed_jobs(html_content):
    soup = BeautifulSoup(html_content, 'html.parser')
    jobs = []
    job_cards = soup.find_all('td', class_='resultContent')
    for job_elem in job_cards:
        title_elem = job_elem.find('h2', class_='jobTitle')
        company_elem = job_elem.find('span', {'data-testid': 'company-name'})
        location_elem = job_elem.find('div', {'data-testid': 'text-location'})
        link_elem = title_elem.find('a', class_='jcs-JobTitle')['href'] if title_elem.find('a', class_='jcs-JobTitle') else None
        
        if None in (title_elem, company_elem, location_elem, link_elem):
            continue
        
        job = {
            'title': title_elem.get_text(strip=True),
            'company': company_elem.get_text(strip=True),
            'location': location_elem.get_text(strip=True),
            'link': 'https://www.indeed.com' + link_elem
        }
        jobs.append(job)
    return jobs

def parse_linkedin_jobs(html_content):
    soup = BeautifulSoup(html_content, 'html.parser')
    jobs = []
    job_cards = soup.find_all('div', class_='job-card-list__entity-lockup')
    for job_elem in job_cards:
        title_elem = job_elem.find('a', class_='job-card-container__link')
        company_elem = job_elem.find('span', class_='job-card-container__primary-description')
        location_elem = job_elem.find('li', class_='job-card-container__metadata-item')
        link_elem = title_elem['href'] if title_elem else None
        
        if None in (title_elem, company_elem, location_elem, link_elem):
            continue
        
        job = {
            'title': title_elem.get_text(strip=True),
            'company': company_elem.get_text(strip=True),
            'location': location_elem.get_text(strip=True),
            'link': 'https://www.linkedin.com' + link_elem
        }
        jobs.append(job)
    return jobs

def load_search_history():
    if os.path.exists(SEARCH_HISTORY_FILE):
        with open(SEARCH_HISTORY_FILE, 'r') as f:
            return json.load(f)
    return []

def save_search_history(history):
    with open(SEARCH_HISTORY_FILE, 'w') as f:
        json.dump(history, f)

def send_email(subject, body):
    msg = MIMEMultipart()
    msg['From'] = EMAIL_SENDER
    msg['To'] = EMAIL_RECEIVER
    msg['Subject'] = subject
    
    msg.attach(MIMEText(body, 'plain'))
    
    try:
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(EMAIL_SENDER, EMAIL_PASSWORD)
            server.sendmail(EMAIL_SENDER, EMAIL_RECEIVER, msg.as_string())
        print('Email sent successfully')
    except Exception as e:
        print(f'Error sending email: {e}')

def find_new_jobs(current_jobs, history):
    def get_base_url(job):
        return urlparse(job['link']).path

    history_set = set(get_base_url(job) for job in history)
    new_jobs = [job for job in current_jobs if get_base_url(job) not in history_set]
    return new_jobs

async def job_search():
    try:
        indeed_url = 'https://www.indeed.com/jobs?q=Java+Developer&l='
        linkedin_url = 'https://www.linkedin.com/jobs/search/?currentJobId=3957450806&f_E=4&f_SB2=24&f_TPR=r86400&geoId=101174742&keywords=software%20engineer&origin=JOB_SEARCH_PAGE_JOB_FILTER&refresh=true'

        # Replace with your LinkedIn credentials
        linkedin_username = 'colinqu73@gmail.com'
        linkedin_password = '12qwerty1157'

        indeed_content = fetch_cloudscraper_content(indeed_url)
        linkedin_content = await fetch_playwright_content(linkedin_url, linkedin_username, linkedin_password)

        indeed_jobs = parse_indeed_jobs(indeed_content) if indeed_content else []
        linkedin_jobs = parse_linkedin_jobs(linkedin_content) if linkedin_content else []

        all_jobs = indeed_jobs + linkedin_jobs
        search_history = load_search_history()
        new_jobs = find_new_jobs(all_jobs, search_history)
        
        if new_jobs:
            body = 'New job listings have been found:\n\n'
            for job in new_jobs:
                body += f"Title: {job['title']}\nCompany: {job['company']}\nLocation: {job['location']}\nLink: {job['link']}\n\n"
            send_email('New Job Listings Found', body)
            save_search_history(search_history + new_jobs)
    except Exception as e:
        send_email('Job Search Failed', f'An error occurred during the job search:\n\n{str(e)}')

def clear_history():
    if os.path.exists(SEARCH_HISTORY_FILE):
        os.remove(SEARCH_HISTORY_FILE)
    print('Search history cleared')

def main():
    # Run job search immediately
    asyncio.run(job_search())
    
    # Schedule the job search every hour and at 10 minutes past each hour
    schedule.every().hour.at(":00").do(lambda: asyncio.run(job_search()))
    schedule.every().hour.at(":30").do(lambda: asyncio.run(job_search()))
    # Schedule the history clearing every week
    schedule.every().week.do(clear_history)

    while True:
        schedule.run_pending()
        time.sleep(1)

if __name__ == '__main__':
    main()

