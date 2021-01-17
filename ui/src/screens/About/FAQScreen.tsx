import * as React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";

import { MainSingleLarge } from "../../components/Main";

const Accordion = styled.div`
  background: #fff;
  border-radius: 0.875rem;
  align-self: stretch;
  margin-bottom: 1rem;

  &:hover {
    background-color: #eee;
  }

  &:focus-within {
    outline: var(--color-blue) auto;
  }
`;

const AccordionHeader = styled.button<{ collapsed: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background: none;
  border: none;
  width: 100%;
  font-size: 1.125rem;
  color: ${(props) => (props.collapsed ? "var(--color-darkblue)" : "var(--color-blue)")};
  padding: 1.5rem;
  &:hover {
    color: var(--color-blue);
  }
  &:focus {
    outline: none;
  }
`;

const AccordionBody = styled.div<{ collapsed: boolean }>`
  width: 100%;
  max-height: ${(props) => (props.collapsed ? "0" : "100%")};
  transition: all 0.2s ease-out;
  overflow: hidden;
`;

const AccordionContent = styled.div`
  padding: 0 1.5rem 1.5rem;
  color: var(--color-grey-300);
  line-height: 1.4;
`;

const CaretSVG = styled.svg<{ collapsed: boolean }>`
  transform: ${(props) => (props.collapsed ? "scaleY(1)" : "scaleY(-1)")};
`;

const contents = [
  {
    question: "What is JobsHippo?",
    answer:
      "JobsHippo is a job connection platform. We, a group of individuals, have built the service on our free time to \
      bridge the gap between job seekers and job providers. We hope JobsHippo can help people during this time of crisis \
      when many people have unfortunately lost their jobs.",
    collapsed: true,
  },
  {
    question: "How do I sign in as a jobseeker?",
    answer:
      "'Sign In' using your LinkedIn account and create a Jobseeker profile. Click on 'I'm Seeking' on Profile Type and \
      fill the required details to complete your profile. You are required to add a link to your portfolio/resume/ GitHub \
      profile URL so that potential recruiters can learn more about you.",
    collapsed: true,
  },
  {
    question: "How do I sign in as a recruiter?",
    answer:
      "'Sign In' using your LinkedIn account and create a Recruiter profile. Click on 'I'm Hiring' \
      on Profile Type and fill the required details to complete your profile. Add your Job Title and \
      Company Name so that potential job seekers can learn more about you.",
    collapsed: true,
  },
  {
    question: "I don't have a LinkedIn account. Is there any other way I can sign in?",
    answer:
      "At this moment, we are using only LinkedIn to authenticate users. In future, \
      we may add other Sign-In options.",
    collapsed: true,
  },
  {
    question: "Can I be both job seeker and recruiter?",
    answer:
      "As the platform aims to establish a connection between job seekers and recruiters, \
      we are only allowing an individual to be a seeker or recruiter, not both.",
    collapsed: true,
  },
  {
    question: "Do I need to pay to use your service?",
    answer:
      "The service is FREE for both recruiters and jobseekers. We aim to keep it this way forever. We don't intend \
      to make any revenue out of this platform.",
    collapsed: true,
  },
  {
    question: "Why am I unable to update my email address?",
    answer:
      "As we use LinkedIn as our authentication service, we are taking the email that is \
      provided by LinkedIn. This ensures that the email is verified and the person has a \
      LinkedIn profile guaranteeing the authenticity of an individual. We are not allowing \
      users to change their emails at the moment. ",
    collapsed: true,
  },
  {
    question: "Why is the site redirecting me to Auth0?",
    answer:
      "Auth0 is an industry-leading solution that provides authentication and authorization \
      services. By using Auth0, we have reduced our development effort at least by a month or \
      two. In addition to reducing the development time, Auth0 also provides us with additional \
      security features and protect us by blocking suspicious IP addresses and avoids DDoS attacks. \
      In short, by using Auth0, your account is more secure. ",
    collapsed: true,
  },
  {
    question: "How do I connect with a Job provider?",
    answer:
      "Click the 'Connect with' button on the jobs board to launch a message screen. Type in your \
      greetings and perhaps a pitch, and send the message. The recruiter will receive a notification \
      by email of your interest.",
    collapsed: true,
  },
  {
    question: "How do I connect with a Jobseeker?",
    answer:
      "Click the 'Connect with' button on the talents board to launch a message screen. Then, \
      send some useful information about the job like a Job Description or a Company Website. \
      The talent will receive your message via email.",
    collapsed: true,
  },
  {
    question: "Is this platform for tech only?",
    answer: "No! This platform is for anyone who is seeking a job or hiring!",
    collapsed: true,
  },
  {
    question: "Am I guaranteed a job on this platform?",
    answer:
      "We hope everyone is able to find a match here, but we can offer no guarantees. If you are seeking a job, make yourself more \
    attractive by including links to your resume and accomplishments in your message. If you are looking to hire, be clear with the job \
    requirement, what you are looking for, and compensation provided. No one likes a shady deal!",
    collapsed: true,
  },
  {
    question: "Can I mark a post as favourite?",
    answer: "We will add this feature in upcoming releases.",
    collapsed: true,
  },
  {
    question: "I want to report an issue, whom should I contact?",
    answer: "Please send us an email at contact@jobshippo.com.sg",
    collapsed: true,
  },
  {
    question: "Thank You, I got a job/candidate through your site. How can I donate some money?",
    answer:
      "That's fantastic news. And thank you for considering a donation. Please send us an email at \
      contact@jobshippo.com.sg, and we will get back to you soon.",
    collapsed: true,
  },
  {
    question: "I am a developer/designer. How can I help out?",
    answer:
      "Thank You for willing to help us. While the team is small, we are thrilled to have new team members. \
      Please send us an email at contact@jobshippo.com.sg",
    collapsed: true,
  },
  {
    question: "Who are the people behind JobsHippo?",
    answer:
      "Since we started this project, ten individuals have spent their time on this platform. \
      Find about them here: https://github.com/jobsgowhere/jobsgowhere",
    collapsed: true,
  },
];

const FAQScreen: React.FC = function () {
  const [faq, setFaq] = React.useState(contents);

  const toggleAnswer = (index: number) => {
    faq[index].collapsed = !faq[index].collapsed;
    setFaq([...faq]);
  };

  return (
    <MainSingleLarge>
      <Helmet>
        <title>FAQ</title>
      </Helmet>
      <h1>Frequently Asked Questions</h1>
      {faq.map((content, index) => {
        const { question, answer, collapsed } = content;
        return (
          <Accordion key={question}>
            <AccordionHeader collapsed={collapsed} onClick={() => toggleAnswer(index)}>
              {question}
              <CaretSVG
                collapsed={collapsed}
                width="14"
                height="8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1l6 6 6-6"
                  stroke="#6E6D7A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </CaretSVG>
            </AccordionHeader>
            <AccordionBody collapsed={collapsed}>
              <AccordionContent>{answer}</AccordionContent>
            </AccordionBody>
          </Accordion>
        );
      })}
      <p>
        Didn&apos;t find an answer?{" "}
        <a href={`mailto:${process.env.REACT_APP_CONTACT_EMAIL}`}>Contact Us</a>
      </p>
    </MainSingleLarge>
  );
};

export default FAQScreen;
