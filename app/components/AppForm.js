import React from "react";
import { Formik } from "formik";
import AppFormField from "./AppFormField";

function AppForm(initialValues, onSubmit, validationSchema, children) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {() => <>{children}</>}
    </Formik>
  );
}

export default AppForm;
