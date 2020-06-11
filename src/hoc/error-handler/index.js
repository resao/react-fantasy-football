import React, { useState, useEffect } from "react";
import Modal from "../../components/ui/modal/";

const withErrorHandler = (WrappedComponent, axios) => {
  return props => {
    const [error, setError] = useState(null)

    const requestInterceptor = axios.interceptors.request.use((req) => {
      setError(null)
      return req;
    });

    const responseInterceptor = axios.interceptors.response.use(
      (res) => res,
      (err) => {
        setError(err)
      }
    );

    useEffect(() => {
      return () => {
        axios.interceptors.request.eject(requestInterceptor);
        axios.interceptors.response.eject(responseInterceptor);
      }
    }, [requestInterceptor, responseInterceptor])

    const errorConfirmedHandler = () => {
      setError(null)
    };

    return (
      <React.Fragment>
        <Modal
          show={error}
          modalClosed={errorConfirmedHandler}
        >
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </React.Fragment>
    );
  };
};

export default withErrorHandler
