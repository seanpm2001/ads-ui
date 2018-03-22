import { TextField, withStyles } from "material-ui";
import Button from "material-ui/Button";
import * as React from "react";
import { Field, reduxForm } from "redux-form";

import { styles } from "./Signup.style";

const renderTextField = (
  props: any,
) => (
    <TextField
      label={props.label}
      error={props.meta.touched && props.meta.invalid}
      type={props.type}
      helperText={props.meta.touched && props.meta.error}
      {...props.input}
      {...props.custom}
    />
  );

const validate = (values: any) => {
  const errors: any = {};
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Required";
  }
  if (!values.organizationName) {
    errors.organizationName = "Required";
  }
  return errors;
};

class SignupForm extends React.Component<any, any> {
  public render() {
    const { classes, handleSubmit, submitting, invalid } = this.props;
    return (
      <div className={classes.root}>
        <form onSubmit={handleSubmit} className={classes.form}>
          <div>
            <Field name="email" type="text" component={renderTextField} label="Email" />
          </div>
          <div>
            <Field name="password" type="password" component={renderTextField} label="Password" />
          </div>
          <div>
            <Field name="organizationName" type="text" component={renderTextField} label="Organization Name" />
          </div>
          <div>
            <Button variant="raised" disabled={submitting || invalid} color="primary" type="submit">Sign Up</Button>
          </div>
        </form>
      </div>
    );
  }
}

const SignupFormRedux = reduxForm({
  form: "signup",
  validate,
})(withStyles(styles)(SignupForm));

export default SignupFormRedux;
