import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";

import Button from "../../../components/Button";
import { Fieldset, Hint, Label, Radio, TextInput } from "../../../components/FormFields";
import JobsGoWhereApiClient from "../../../shared/services/JobsGoWhereApiClient";
import { Auth0Profile, FullProfile } from "../types";
import ProfileImage from "./ProfileImage";

const RECRUITER = "Recruiter";
const SEEKER = "Seeker";

const TwoCol = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Col = styled.div`
  flex: 1;
  & + & {
    margin-left: 0.875rem;
  }
`;

const RadiosHolder = styled.div`
  display: flex;
  align-items: center;
  .radio-item + .radio-item {
    margin-left: 2rem;
  }
`;

type FormValues = {
  first_name: string;
  last_name: string;
  profile_type: string;
  email: string;
  avatar_url: string;
  headline?: string;
  company?: string;
  website?: string;
};

interface ProfileEditProps {
  profile: Auth0Profile | FullProfile;
  handleCancelEdit: () => void;
  newUser?: true;
}

const Edit: React.FC<ProfileEditProps> = ({ profile, newUser, handleCancelEdit }) => {
  const { firstName, lastName, email, picture } = profile;
  const profileType = ("profileType" in profile && profile.profileType) || RECRUITER;
  const company = ("company" in profile && profile.company) || "";
  const [headline, setHeadline] = React.useState(("headline" in profile && profile.headline) || "");
  const [website, setWebsite] = React.useState(("website" in profile && profile.website) || "");

  const [selectedProfileType, setSelectedProfileType] = React.useState(profileType);
  const { register, handleSubmit, errors } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    try {
      await JobsGoWhereApiClient({
        url: `${process.env.REACT_APP_API}/profile`,
        method: newUser ? "post" : "put",
        data: values,
      });
      window.location.reload();
    } catch (error) {
      console.error(error.toJSON());
      throw error;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Fieldset>
        <ProfileImage src={picture} width="128" height="128" alt="profile image" />
      </Fieldset>
      <TwoCol>
        <Col>
          <Fieldset>
            <Label htmlFor="first-name">First Name</Label>
            <TextInput
              id="first-name"
              name="first_name"
              defaultValue={firstName}
              ref={register({ required: true })}
              error={!!errors.first_name}
            />
          </Fieldset>
        </Col>
        <Col>
          <Fieldset>
            <Label htmlFor="last-name">Last Name</Label>
            <TextInput
              id="last-name"
              name="last_name"
              defaultValue={lastName}
              ref={register({ required: true })}
              error={!!errors.last_name}
            />
          </Fieldset>
        </Col>
      </TwoCol>
      {newUser ? (
        <Fieldset name="profile-type">
          <Label htmlFor="profile-type">Profile Type</Label>
          <RadiosHolder>
            <div className="radio-item">
              <Radio
                value={RECRUITER}
                name="profile_type"
                defaultChecked={profileType === RECRUITER}
                onChange={() => {
                  setSelectedProfileType(RECRUITER);
                }}
                innerRef={register}
              >
                I&apos;m Hiring
              </Radio>
            </div>
            <div className="radio-item">
              <Radio
                value={SEEKER}
                name="profile_type"
                defaultChecked={profileType === SEEKER}
                onChange={() => {
                  setSelectedProfileType(SEEKER);
                }}
                innerRef={register}
              >
                I&apos;m Seeking
              </Radio>
            </div>
          </RadiosHolder>
        </Fieldset>
      ) : (
        "profileType" in profile && (
          <input type="hidden" name="profile_type" value={profile.profileType} ref={register} />
        )
      )}
      {selectedProfileType === RECRUITER && (
        <>
          <Fieldset>
            <Label htmlFor="job-title">Job Title</Label>
            <TextInput
              id="job-title"
              name="headline"
              defaultValue={headline}
              ref={register}
              onChange={(e) => setHeadline(e.target.value)}
            />
          </Fieldset>
          <Fieldset>
            <Label htmlFor="company">Company</Label>
            <TextInput id="company" name="company" defaultValue={company} ref={register} />
          </Fieldset>
          <Fieldset>
            <Label htmlFor="company-website">Company Website</Label>
            <TextInput
              id="company-website"
              name="website"
              defaultValue={website}
              ref={register}
              onChange={(e) => setWebsite(e.target.value)}
            />
            <Hint>
              Include a company link for potential candiates to learn more about your company
            </Hint>
          </Fieldset>
        </>
      )}
      {selectedProfileType === SEEKER && (
        <>
          <Fieldset>
            <Label htmlFor="headline">Headline</Label>
            <TextInput
              id="headline"
              name="headline"
              defaultValue={headline}
              ref={register}
              onChange={(e) => setHeadline(e.target.value)}
            />
            <Hint>Give a headline of what you want others to see you as.</Hint>
          </Fieldset>
          <Fieldset>
            <Label htmlFor="seeker-website">Website / Portfolio / Github</Label>
            <TextInput
              id="seeker-website"
              name="website"
              defaultValue={website}
              ref={register}
              onChange={(e) => setWebsite(e.target.value)}
            />
            <Hint>Include a link for potential companies to learn more about you.</Hint>
          </Fieldset>
        </>
      )}
      <Fieldset>
        <Label htmlFor="email">Email</Label>
        <TextInput
          id="email"
          name="email"
          defaultValue={email}
          ref={register({
            required: true,
            pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
          error={!!errors.email}
        />
        <Hint>This is for the emails you will receive when you connect with someone.</Hint>
      </Fieldset>
      {newUser ? (
        <Button type="submit" fullWidth primary>
          Continue
        </Button>
      ) : (
        <TwoCol>
          <Col>
            <Button type="button" onClick={handleCancelEdit} fullWidth>
              Cancel
            </Button>
          </Col>
          <Col>
            <Button type="submit" fullWidth primary>
              Save
            </Button>
          </Col>
        </TwoCol>
      )}
      <input type="hidden" name="avatar_url" value={picture} ref={register} />
    </form>
  );
};

export default Edit;
