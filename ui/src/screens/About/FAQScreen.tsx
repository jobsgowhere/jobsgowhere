import * as React from "react";
import styled from "styled-components";

const MainSingle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-area: main;
  max-width: 735px; 
  width: 100%;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  text-align: center;
`;

const Accordion = styled.div`
  background: #fff;
  border-radius: 0.875rem;
  align-self: stretch;
  padding: 1rem;
  font-family: 'Nunito';
  font-size: 18px;
  font-weight: 400;

  &:hover {
    background-color: #eee; 
  }
`;

const AccordionHeader = styled.div<{collapsed: boolean}>`
  &:hover {
    color: blue;
  }
  color: ${(props) => (props.collapsed) ? 'black' : 'blue'};
`;

const Internal = styled.div<{collapsed: boolean}>`
  width: 100%;
  max-height: ${(props) => (props.collapsed ? '0' : '100%')};
  transition: all 0.3s ease-out;
  overflow: hidden;
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
    <MainSingle>
      <Title>Frequently Asked Questions</Title>
      {faq.map((content, index) => {
        const { question, answer, collapsed } = content;
        return (
          <Accordion key={question}>
            <AccordionHeader collapsed={collapsed} onClick={() => toggleAnswer(index)}>
              {question}
            </AccordionHeader>
            <Internal collapsed={collapsed}>{answer}</Internal>
          </Accordion>
        );
      })}
    </MainSingle>
  );
};

export default FAQScreen;
