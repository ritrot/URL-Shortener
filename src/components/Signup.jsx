import {Input} from "./ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {Button} from "./ui/button";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import * as Yup from "yup";
import Error from "./error";
import {signup} from "../db/apiAuth";
import UseFetch from "../hooks/UseFetch";
import {UrlState} from "../Contextapi";

const Signup = () => {
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    profilepic: null,
    name: "",
  });

  const handleInputChange = (e) => {
    const {name, value , file} = e.target;
    setFormData((prevState ) => ({
      ...prevState,
      [name]: file? file.file[0]: value,
    }));
  };

  const {loading, error, fn: fnSinup, data} = UseFetch(signup, formData);
  const {fetchUser} = UrlState();

  useEffect(() => {
    if (loading) {
      console.log("Loading...");
      return;
    }
    if (error === null && data) {
      fetchUser();
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
    }
  }, [error, loading]);

  const handleSignup = async () => {
    setErrors([]);
    try {
      const schema = Yup.object().shape({
        name: Yup.string()
          .min(2, "Name must be at least 2 characters")
          .required("Name is required"),
        email: Yup.string()
          .email("Invalid email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
        profilepic: Yup.mixed().required("Profile picture is required")
      });

      await schema.validate(formData, {abortEarly: false});
      await fnSinup();
    } catch (e) {
      const newErrors = {};

      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Signup</CardTitle>
        <CardDescription>
          Create a new account to access the application.
        </CardDescription>
        {error && <Error message={error.message} />}
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Input
            name="name"
            type="text"
            placeholder="Enter Name"
            onChange={handleInputChange}
          />
        </div>
        {errors.name && <Error message={errors.name} />}
        <div className="space-y-1">
          <Input
            name="email"
            type="email"
            placeholder="Enter Email"
            onChange={handleInputChange}
          />
        </div>
        {errors.email && <Error message={errors.email} />}
        <div className="space-y-1">
          <Input
            name="password"
            type="password"
            placeholder="Enter Password"
            onChange={handleInputChange}
          />
        </div>
        {errors.password && <Error message={errors.password} />}
        <div className="space-y-1">
          <Input
            name="profilepic"
            type="file"
            accept="image/*"
            onChange={handleInputChange}
          />
        </div>
        {errors.profilepic && <Error message={errors.profilepic} />}
      </CardContent>
      <CardFooter>
        <Button onClick={handleSignup}>
          {"Signup"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Signup;