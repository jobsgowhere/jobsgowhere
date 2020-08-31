import * as React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import Button from "../../../components/Button";
import { Fieldset, Label, TextInput } from "../../../components/FormFields";
import { toast } from "../../../components/useToast";
import JobsGoWhereApiClient from "../../../shared/services/JobsGoWhereApiClient";
import { PostType } from "../machines/NewPostForm";
import DescriptionField from "./DescriptionField";
import PostTypeField from "./PostTypeField";

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

const ErrorMsg = styled.span`
  color: red;
  font-size: 0.75rem;
`;

const INITIAL_TYPE = "talent";

const NewPostForm: React.FC = function () {
  const history = useHistory();
  const { handleSubmit, setValue, getValues, watch, register, errors } = useForm<FormFields>();
  const watchPostType = watch("type", INITIAL_TYPE);

  interface FormFields {
    type: PostType;
    title: string;
    link?: string;
    description: string;
    city: string;
  }

  const onSubmit = (values: FormFields) => {
    console.log("submitting");
    console.log(values);

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
        console.log("post", response);
      } catch (err) {
        console.error("error", err);
      }
    };
    postJob();
  };

  React.useEffect(() => {
    register({ name: "type" }, { required: true });
  }, [register]);

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
            ref={register({ required: "A post title is required" })}
            error={!!errors.title}
          />
          {errors.title && <ErrorMsg>{errors.title.message}</ErrorMsg>}
        </Fieldset>
        {watchPostType === "job" && (
          <Fieldset>
            <Label htmlFor="link">Job Role Link</Label>
            <TextInput
              id="link"
              name="link"
              type="url"
              ref={register({
                required: "A valid link is required (e.g. https://jobsgowhere.com)",
              })}
              error={!!errors.link}
            />
            {errors.link && <ErrorMsg>{errors.link.message}</ErrorMsg>}
          </Fieldset>
        )}

        <DescriptionField
          register={register}
          rules={{
            required: "A post description is required",
            minLength: {
              value: 3,
              message: "Description must have minimum 3 characters",
            },
          }}
          error={!!errors.description}
        />
        {errors.description && <ErrorMsg>{errors.description.message}</ErrorMsg>}
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
