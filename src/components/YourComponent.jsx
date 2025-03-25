import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataAsync } from "../redux/yourActions";
import { Button } from "react-bootstrap";

const YourComponent = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.yourState.data);

  useEffect(() => {
    dispatch(fetchDataAsync());
  }, [dispatch]);

  return (
    <div>
      <h1>Your Data</h1>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
      <Button variant="primary" onClick={() => dispatch(fetchDataAsync())}>
        Refresh Data
      </Button>
    </div>
  );
};

export default YourComponent;
