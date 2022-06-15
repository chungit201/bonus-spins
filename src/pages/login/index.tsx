import React, {useState} from "react";
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {setAccountData} from "../../stores/userSlice";
import {useDispatch} from "react-redux";
import {encodeJwt} from "../../utils";

const background = require("../assets/images/BANNERspin.png");
const LoginPage: React.FunctionComponent = () => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const defaultAccount = {
    email: "slimeroyale.2020@gmail.com",
    password: "@3009021#slimeroyale"
  }


  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const user = {
      email: email,
      password: pw
    }
    if (defaultAccount.email == email && defaultAccount.password == pw) {
      const tokenPrivate = await encodeJwt(defaultAccount);
      dispatch(setAccountData(user))
      navigate('/',{replace:true})
      localStorage.setItem('accessToken',JSON.stringify(tokenPrivate))
    }
  }

  return (
    <div
      style={{
        background: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        display: "flex",
        width: "100%",
        height: "100vh",
        justifyContent: "center",
        position: "relative",
        alignItems: "center"
      }}
    >
      <Row className={"w-100 d-flex justify-content-center"}>
        <Col xl={4} xs={8} sm={6}>
          <div className={"form-login"}>
            <Form className={"p-5"}>
              <h4 className={"text-center"}>SLIME ROYALE LOTTERY</h4>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  onChange={(e) => {
                    setEmail(e.target.value)
                  }}
                  type="email"
                  placeholder="Enter email"/>
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => {
                    setPw(e.target.value)
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
              </Form.Group>
              <div className={"text-center "}>
                <Button onClick={handleSubmit} className={"btn-signup mt-3"} style={{fontWeight: "600"}}
                        variant="primary" type="submit">
                  Sign up
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>

    </div>
  )
}

export default LoginPage
