import * as React from "react";
import styled from "styled-components";

import { CategoryTypes, PostInterface } from "../../types";

export const ContentContainer = styled.div`
  flex: auto;
  display: flex;
  flex-direction: row;
  padding: 1rem 1.5rem;
`;

export const Avatar = styled.div`
  flex: 0 0 auto;
  margin-right: 1.375rem;
`;

export const Info = styled.div`
  flex: auto;
  display: flex;
  flex-direction: column;
`;

export const InfoHeader = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
`;

export const Actions = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: -0.5rem;
  align-items: center;
`;

export const Title = styled.h2`
  margin: 0 0 1rem;
  font-size: 1.125rem;
  line-height: 1.4;
  color: var(--color-darkblue);
  font-weight: 400;
`;

export const Name = styled.h3`
  font-size: 1rem;
  margin: 0.25rem 0;
  color: var(--color-darkblue);
`;

export const Headline = styled.h4`
  margin: 0;
  font-size: 0.875rem;
  font-weight: 400;
  color: var(--color-grey-300);
`;

export const Description = styled.div`
  color: var(--color-grey-300);
  line-height: 1.4;
  margin-bottom: 1rem;
`;

export const Timestamp = styled.div`
  margin-top: auto;
  font-size: 0.875rem;
  color: var(--color-grey-300);
`;

export const AvatarImage = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 32px;
`;

// Post Links

type PostLinksProps = {
  data: PostInterface;
  category: CategoryTypes;
};

const PostLinksContainer = styled.div`
  display: flex;
  border-radius: 0.875rem;
  box-shadow: 0 0.5rem 1.25rem rgba(0, 25, 71, 0.05), 0 -0.5rem 1.25rem rgba(0, 25, 71, 0.05);
  margin-bottom: 1.25rem;
  align-self: flex-start;
`;
const PostLink = styled.a.attrs({ target: "_blank", rel: "noreferrer noopener" })`
  padding: 0.875rem 2rem;
  text-align: center;
  flex: 1 0 0;
  white-space: nowrap;
  color: var(--color-grey-300);
  &:hover {
    color: var(--color-blue);
  }

  & + & {
    border-left: 1px solid var(--color-background);
  }
`;

export const PostLinks: React.FC<PostLinksProps> = ({ data, category }) => {
  /* eslint-disable @typescript-eslint/camelcase */
  const { job_link, company_link, website } = data;
  if (job_link || company_link || website) {
    return (
      <PostLinksContainer>
        {job_link && <PostLink href={job_link}>Job Details</PostLink>}
        {website && (
          <PostLink href={website}>
            {category === "talents" ? "My Portfolio" : "Company Info"}
          </PostLink>
        )}
      </PostLinksContainer>
    );
  }
  return null;
};
