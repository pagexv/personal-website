import React, { useEffect, useRef, useState } from 'react';
import './About.css';
import Navbar from './Navbar';
import BackgroundVideo from './BackgroundVideo';
import ScrollSectionWrapper from './ScrollSectionWrapper';
import ListSection from './ListSection';
import ThirdBackground from './ThirdBackground';
import ScrollDownIndicator from './ScrollDownIndicator';

const About = () => {
  const [currentBackground, setCurrentBackground] = useState(1);
  const videoRef = useRef(null);
  const listRef = useRef(null);
  const thirdBackgroundRef = useRef(null);
  const [listItemsVisible, setListItemsVisible] = useState([false, false, false]);

  useEffect(() => {
    const handleScroll = () => {
      const videoHeight = videoRef.current.offsetHeight;
      const listHeight = listRef.current.scrollHeight;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      if (scrollY < videoHeight) {
        setCurrentBackground(1);
      } else if (scrollY < videoHeight + listHeight) {
        setCurrentBackground(2);
      } else if (listItemsVisible.every(item => item) && scrollY >= videoHeight + listHeight) {
        setCurrentBackground(3);
      }

      const threshold = windowHeight / 3;

      listItemsVisible.forEach((visible, index) => {
        if (scrollY >= videoHeight + index * threshold && scrollY < videoHeight + (index + 1) * threshold) {
          setListItemsVisible((prev) => {
            const newList = [...prev];
            newList[index] = true;
            return newList;
          });
        } else if (scrollY < videoHeight + index * threshold) {
          setListItemsVisible((prev) => {
            const newList = [...prev];
            newList[index] = false;
            return newList;
          });
        }
      });

      if (scrollY >= videoHeight / 2 && scrollY < videoHeight) {
        videoRef.current.classList.add('zoom');
      } else {
        videoRef.current.classList.remove('zoom');
      }

      if (scrollY >= videoHeight && scrollY < videoHeight + windowHeight) {
        listRef.current.classList.add('zoom');
      } else {
        listRef.current.classList.remove('zoom');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [listItemsVisible]);

  return (
    <div className="about">
      <Navbar />
      <BackgroundVideo ref={videoRef} isVisible={currentBackground === 1}>
        <div className="experience">
          <h2>Experience</h2>
          <p>Software Developer</p>
          <p>Identos Inc Toronto</p>
          <ul>
            <li>Developed a key component for delegating to a SmileCDR instance, collaborating effectively with a cross-functional team including SmileCDR and CareTeam specialists to ensure seamless integration and functionality.</li>
            <li>Led the development of an IAM solution integrated with a FHIR instance, streamlining the development cycle and introducing fine-grained access control.</li>
            <li>Delivered a pioneering minimum viable product for the UK pension dashboard program, consolidating various resource servers and garnering positive feedback from stakeholders.</li>
            <li>Successfully led the upgrade of a Spring Boot 2 application to Spring Boot 3, meticulously replacing deprecated codes and ensuring a smooth transition to the latest technology standards.</li>
            <li>Pioneered the seamless integration of User-Managed Access (UMA) & OAuth principles, elevating security standards and user autonomy within the application.</li>
            <li>Instrumental in building a comprehensive admin portal, utilizing React, Elide, and PHP.</li>
            <li>Engineered advanced automation tools by integrating Python Behave, Selenium, and qTest, enhancing testing efficiency and accuracy in software development processes.</li>
          </ul>
          <p>Software Developer</p>
          <p>Big data research lab Toronto, ON</p>
          <ul>
            <li>Enhanced backend efficiency and ensured robust system stability through targeted optimizations and strategic improvements.</li>
            <li>Specialized in designing robust APIs for backend systems and seamlessly integrating third-party APIs for enhanced functionality and interoperability.</li>
            <li>Successfully migrated the solution from a local environment to a cloud service using Docker, optimizing scalability and performance. Utilized cloud services for the monitoring and deployment of applications.</li>
          </ul>
        </div>
      </BackgroundVideo>
      <ScrollSectionWrapper currentBackground={currentBackground}>
        <div className="education">
          <h2>Education</h2>
      
          <p>Master of Science in Computer Science @Arizona State University Remote, US</p>
          <p>Bachelor of Science in Computer Science @University of Waterloo Waterloo, ON</p>
    
        </div>
      </ScrollSectionWrapper>
      <ListSection ref={listRef} isVisible={currentBackground === 2} visibleItems={listItemsVisible} />
      <ThirdBackground ref={thirdBackgroundRef} isVisible={currentBackground === 3}>
     
        <div className="contact-links">
          <h2>Contact</h2>
          <p><a href="https://github.com/your-github">GitHub</a></p>
          <p><a href="https://www.linkedin.com/in/your-linkedin">LinkedIn</a></p>
        </div>
      </ThirdBackground>
      <ScrollDownIndicator isVisible={currentBackground < 3} />
    </div>
  );
};

export default About;
