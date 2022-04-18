import React from "react";
import {useField} from "formik";
import {FieldFeedbackLabel} from "./FieldFeedbackLabel";

const getFieldCSSClasses = (touched, error) => {
  console.log(error)
  const classes = ["form-control", "form-control-solid"];
  if (touched && error) {
    classes.push("is-invalid is-invalid-select");
  }

  if (touched && !error) {
    classes.push("is-valid is-valid-select");
  }

  return classes.join(" ");
};

export function Select({
  label,
  withFeedbackLabel,
  type = "text",
  customFeedbackLabel,
  children,
  ...props
}) {
  const [field, meta] = useField(props);
  const { touched, error } = meta;

  return (
    <>
      {label && <label>Select {label}</label>}
      <select
        className={getFieldCSSClasses(touched, error)}
        {...props.field}
      >
        {children}
      </select>
      {withFeedbackLabel && (
        <FieldFeedbackLabel
          error={error?.[field?.name]}
          touched={touched}
          label={label}
          customFeedbackLabel={customFeedbackLabel}
        />
      )}
    </>
  );
}
