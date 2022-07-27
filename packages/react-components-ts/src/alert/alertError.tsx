import React from 'react';
import { IPropError, PropError } from '../helpers/customPropTypes';
import AlertMessage from './alertMessage';

export interface AlertErrorProps {
  /** An error as a string, Error instance, or custom extended type */
  error: IPropError,
};

const getMessage = (error: IPropError) => {
  if (typeof error === 'string') {
    return error;
  }

  return error.message;
};

const getPublicCauses = (error: IPropError) => {
  const causes = (error as PropError)?.causes || [];

  return causes.filter(cause => !cause.sensitivity);
};

const CauseList = ({ error }: { error: IPropError }) => {
  const causes = getPublicCauses(error);

  if (!causes.length) {
    return null;
  }

  return (
    <ul className="rc-error-alert-cause-list">
      {causes.map(cause => {
        const message = getMessage(cause);

        return (
          <li className="rc-error-alert-cause" key={message}>
            {message}
            <CauseList error={cause} />
          </li>
        );
      })}
    </ul>
  );
};

const AlertError = ({ error }: AlertErrorProps) => {
  const causes = getPublicCauses(error);

  return (
    <>
      {getMessage(error)}
      {!!causes.length && (
        <AlertMessage>
          <CauseList error={error} />
        </AlertMessage>
      )}
    </>
  );
};

export default AlertError;
