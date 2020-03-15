import {ErrorMessage} from "ng-bootstrap-form-validation";

export const CUSTOM_ERRORS: ErrorMessage[] = [
  {
    error: "required",
    format: requiredFormat
  }, {
    error: "email",
    format: emailFormat
  },
  {
      error: "number",
      format: numberFormat
  }
];

export function requiredFormat(label: string, error: any): string {
  return `${label} to be provide the information cannot be blank`;
}

export function emailFormat(label: string, error: any): string {
  return `${label} doesn't look like a valid email address.`;
}

export function numberFormat(label: string, error: any): string {
    return `${label} please provide valid phone number`;
  }