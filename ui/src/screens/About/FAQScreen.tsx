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
    answer: "Click the Connect with button on the jobs board to launch a message screen. Then, type in your greetings and \
    perhaps a pitch, then send the message. The recruiter will receive a notification by email about your interest."
  },
  {
    question: "How do I connect with a Job Seeker?",
    answer: "Click the Connect with button on the talents board to launch a message screen. Then, send some useful information \
    about the job like a Job Description or a Company Website. The talent will receive your message via email."
  },
  {
    question: "Is this platform for tech only?",
    answer: "No! This platform is for anyone who is seeking a job or hiring!"
  },
  {
    question: "Am I guaranteed a job on this platform?",
    answer: "We hope everyone is able to find a match here, but we can offer no guarantees. If you are seeking a job, make yourself more \
    attractive by including links to your resume and accomplishments in your message. If you are looking to hire, be clear with the job \
    requirement, what you are looking for, and compensation provided. No one likes a shady deal!"
  }
]

const FAQScreen: React.FC = function () {

  let collapsedInitial = new Array(contents.length);
  collapsedInitial.fill(true);
  const [collapsed, setCollapsed] = React.useState(collapsedInitial);

  const toggleAnswer = function(event: React.MouseEvent) : void {
    const id = parseInt(event.currentTarget.id);
    let newCollapsed = [...collapsed];
    newCollapsed[id] = !collapsed[id];
    setCollapsed(newCollapsed);
  }

  return (
    <MainSingle>
      <Title>Frequently Asked Questions</Title>
      {contents.map((content, index) => {
        return (
        <Accordion id={index.toString()} onClick={toggleAnswer}> 
          <AccordionHeader collapsed={collapsed[index]}>
            {content.question}
          </AccordionHeader>
          <Internal collapsed={collapsed[index]}>
            <br />
            {content.answer}
          </Internal>
        </Accordion>);
      }) }
      
    </MainSingle>
  );
};

export default FAQScreen;
