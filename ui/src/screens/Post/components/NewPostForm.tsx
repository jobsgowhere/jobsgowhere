import * as React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import Button from "../../../components/Button";
import { Fieldset, Label, TextInput, InputErrorMessage } from "../../../components/FormFields";
import { toast } from "../../../components/useToast";
import JobsGoWhereApiClient from "../../../shared/services/JobsGoWhereApiClient";
import { PostType, PostInterface } from "../../../types";
import DescriptionField from "./DescriptionField";
import PostTypeField from "./PostTypeField";

// import PostContext from "../../../contexts/Post"

const Container = styled.div`
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  width: 100%;
  background-color: white;
  border-radius: 0.875rem;
  padding: 1.5rem;
`;

const Buttons = styled.div`
  display: flex;
  margin-top: 0.5rem;
  ${Button} + ${Button} {
    margin-left: 1rem;
  }
`;

const INITIAL_TYPE = "talent";

interface PostEditProps {
  post: PostInterface;
}

// const NewPostForm: React.FC<PostEditProps> = ({ post }) => {
const NewPostForm: React.FC = () => {
  const history = useHistory();
  const { handleSubmit, setValue, getValues, watch, register, errors } = useForm<FormFields>();
  const watchPostType = watch("type", INITIAL_TYPE);
  // const post = React.useContext(PostContext)
  // const { title, job_link, description } = post;

  interface FormFields {
    type: PostType;
    title: string;
    job_link?: string;
    description: string;
    city: string;
  }

  const onSubmit = (values: FormFields) => {
    const postJob = async () => {
      try {
        const response = await JobsGoWhereApiClient.post(
          `${process.env.REACT_APP_API}/${values.type}`,
          JSON.stringify(values),
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        toast("Your post has been successfully created! 👍");
        await new Promise((response) => setTimeout(response, 3000));
        history.push(`/${values.type}s`);
      } catch (err) {
        console.error("error", err);
        toast("We are unable to create your post at this time 🙇‍♂️");
      }
    };
    postJob();
  };

  React.useEffect(() => {
    register({ name: "type" }, { required: true });
    setValue("type", INITIAL_TYPE);
  }, [register, setValue]);

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <PostTypeField
          value={watchPostType}
          onChange={(type) => {
            setValue("type", type);
          }}
        />
        <Fieldset>
          <Label htmlFor="title">Title</Label>
          <TextInput
            id="title"
            name="title"
            defaultValue=""
            ref={register({ required: "Please enter a post title" })}
            error={!!errors.title}
          />
          {errors.title && <InputErrorMessage>{errors.title.message}</InputErrorMessage>}
        </Fieldset>
        {watchPostType === "job" && (
          <Fieldset>
            <Label htmlFor="job_link">Job Role Link</Label>
            <TextInput
              id="job_link"
              name="job_link"
              defaultValue=""
              ref={register({
                required: "Please enter a job link in this format (e.g. https://jobsgowhere.com)",
                pattern: {
                  value: /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
                  message: "Please enter a valid job link (e.g. https://jobsgowhere.com)",
                },
              })}
              error={!!errors.job_link}
            />
            {errors.job_link && <InputErrorMessage>{errors.job_link.message}</InputErrorMessage>}
          </Fieldset>
        )}

        <DescriptionField
          register={register}
          rules={{
            required: "Please enter a post description",
            minLength: {
              value: 3,
              message: "Please enter a description with a minimum of 3 characters",
            },
          }}
          error={errors.description}
        />
        <input type="hidden" name="city" value="Singapore" ref={register} />
        <Buttons>
          <Button fullWidth type="button" onClick={() => history.goBack()}>
            Cancel
          </Button>
          <Button fullWidth primary type="submit">
            Create
          </Button>
        </Buttons>
      </form>
    </Container>
  );
};

export default NewPostForm;
