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
    question: "How do I connect with a Job Provider?",
    answer:
      "Click the Connect with button on the jobs board to launch a message screen. Then, type in your greetings and \
    perhaps a pitch, then send the message. The recruiter will receive a notification by email about your interest.",
    collapsed: true,
  },
  {
    question: "How do I connect with a Job Seeker?",
    answer:
      "Click the Connect with button on the talents board to launch a message screen. Then, send some useful information \
    about the job like a Job Description or a Company Website. The talent will receive your message via email.",
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
        Didn't find an answer? <a href="mailto:jgw@jgw.com">Contact Us</a>
      </p>
    </MainSingleLarge>
  );
};

export default FAQScreen;
