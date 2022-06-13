import React, {useEffect, useRef, useState} from "react";
import {Button, Col, InputGroup, Modal, Row, Form, Toast} from "react-bootstrap";
import {notification} from "antd";
import '../assets/css/odometer-theme-slot-machine.css'
// @ts-ignore
import Odometer from "react-odometerjs";
import {getMaxTicket} from "../../service/api-service/ticketApi";
import {decodeJwt} from "../../utils";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const background = require("../assets/images/BANNERspin.png");
const StatsbarHOC = (props: any) => (
  <span className={props.odometerStyle}>
    <Odometer
      animation={props.animation}
      duration={props.duration}
      format={props.format}
      theme={props.theme}
      value={props.value}
    />
  </span>
);

const HomePage: React.FunctionComponent = () => {
  const [odometerValue, setOdometerValue] = useState("");
  const [spined, setSpined] = useState(false);
  const [text, setText] = useState(false)
  const [show, setShow] = useState(false)
  const [userList, setUserList] = useState([]);
  const [success, setSuccess] = useState(false);
  const [totalSpin, setTotalSpin] = useState(0);
  const [max, setMax] = useState<any>(localStorage.getItem('max'))
  const [random, setRandom] = useState(0);
  const user = useSelector((state: any) => state.user);
  const [setting, setSetting] = useState(false);
  const [textMax, setTextMax] = useState("");
  const [maxApi, setMaxApi] = useState(0)
  const navigate = useNavigate()
  useEffect(() => {
    setOdometerValue("105675");
    checkAccount()
    checkMaxTicket()
  }, [])

  const checkAccount = () => {
    console.log("uuuuuuuuuuu", user)

    if (!user.email || user.email !== "slimeroyale.2020@gmail.com") {
      navigate('/login', {replace: true})
    }
  }

  const maxTicket = async () => {
    await getMaxTicket().then(async (res) => {
      const {data}: any = await decodeJwt(res.data);
      console.log(data.max);
      setTextMax(data.max)

    })
  }

  const checkMaxTicket = async () => {
    await getMaxTicket().then(async (res) => {
      const {data}: any = await decodeJwt(res.data);
      console.log(data.max);
     if(!max){
       setMax(data.max)
     }

    })
  }

  const handleLogin = () => {
    localStorage.clear();
    navigate('/login', {replace: true})
  }
  console.log("maxxxx", max)

  const dandleSpin = () => {
    setTotalSpin(totalSpin + 1)
    setOdometerValue("")
    setText(false)
    setSpined(true)
    setTimeout(() => {
      setSpined(false)
    }, 3200);
    setTimeout(() => {
      setShow(true)
    }, 2500);
    let value = Math.floor(Math.random() * (parseInt(max) + 1));
    console.log("vallllllll", value)
    setRandom(value)
    const length = value.toString().length
    if (length == 1) {
      setOdometerValue(`10000${value}`)
    } else if (length == 2) {
      setOdometerValue(`1000${value}`)
    } else if (length == 3) {
      setOdometerValue(`100${value}`)
    } else if (length == 4) {
      setOdometerValue(`10${value}`)
    } else {
      setOdometerValue(`1${value}`)
    }
  }
  const handleClose = () => setShow(false);

  const handleSave = async () => {
    parseInt(odometerValue.slice(1));
    setUserList((state): any => [...state, random]);
    setShow(false)
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false)
    }, 2000)
  }

  const numberConfig = () => {
    if (textMax) {
      localStorage.setItem("max", textMax);
      setMax(textMax)
      setSetting(false);
      notification.success({message: "Installed update successfully"});
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
      <Modal
        show={setting}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={()=>{setSetting(false)}}
        className={"modal-setting"}
      >

        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Setting
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{padding:"50px"}}>
          <InputGroup className="mb-3">
            <Form.Control
              onChange={(e: any) => {
                setMax(e.target.value)
                setTextMax(e.target.value)
              }}
              type={"number"}
              placeholder="Enter max number..."
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={textMax}
              max={10000}
              min={1}
            />
            <Button disabled={textMax.length > 6 && true} onClick={numberConfig} variant="outline-secondary"
                    id="button-addon2">
              Save
            </Button>
          </InputGroup>
          {textMax.length > 6 && <div>
            <p className={"text-center"} style={{color: "red"}}>Maximum number should not be more than 100000</p>
          </div>}
          <h4
            className={"text-center"}>{textMax ? "Current largest number" : "Max ticket now"}: { textMax}</h4>
          <div className={"d-flex justify-content-center"}>

            <Button onClick={maxTicket} className={"text-center mt-2"}>Get max ticket now</Button>
          </div>
        </Modal.Body>

      </Modal>
      <Modal
        show={show}
        size="lg"
        onHide={handleClose}
        centered
        className={"modal-spin-success "}
      >
        <Modal.Body>
          <div className={"text-center mt-4"}>
            <h1 style={{color: "#FFFFFF", fontWeight: 700}}>Player with ticket <span
              style={{color: "red"}}>{odometerValue.slice(1)}</span> have won the reward.</h1>
            <div style={{fontSize: "24px"}}>Please DM admin to claim your reward.</div>
          </div>
          <Row style={{width: ""}} className={"d-flex justify-content-center mt-5"}>
            <Col xl={6} xs={6} className={"text-center"}>
              <Button onClick={handleClose} className={"cancel-spins"}>Cancel this result</Button>
            </Col>
            <Col xl={6} xs={6} className={"text-center"}>
              <Button onClick={handleSave} className={"save-spins"}>Save this result</Button>
            </Col>
          </Row>
        </Modal.Body>


      </Modal>
      <div className={" d-flex justify-content-center py-3"}>
        <div>
          <div style={{position: "relative"}}>
            <img width={"800px"} src={require("../assets/images/Spin.png")} alt=""/>
            <div style={{position: "absolute", top: "142px", left: "90px"}}>
              <StatsbarHOC
                format={"d"}
                duration={3000}
                value={odometerValue}
                theme="slot-machine"
                odometerStyle={""}

              />
            </div>
            {!spined ? (
              <div onClick={dandleSpin} className={"btn-spin animate__animated animate__bounceIn"}>
                <div style={{position: "relative"}}>
                  <img width={"220px"} src={require("../assets/images/button_blue_12.png")} alt=""/>
                  <h3
                    style={{
                      position: "absolute",
                      bottom: "6px",
                      left: "78px",
                      color: "#FFFFFF",
                      fontFamily: 'Berlin Sans FB Demi ',
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      fontSize: "24px"
                    }}
                  >
                    Spin
                  </h3>
                </div>
              </div>
            ) : (
              <div className={"btn-spinning"}>
                <div style={{position: "relative"}}>
                  <img width={"220px"} src={require("../assets/images/button_blue_12.png")} alt=""/>
                  <h3
                    style={{
                      position: "absolute",
                      bottom: "6px",
                      left: "40px",
                      color: "#FFFFFF",

                      fontFamily: 'Berlin Sans FB Demi ',
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      fontSize: "24px"
                    }}
                  >
                    Spinning...
                  </h3>
                </div>
              </div>
            )}
            <div style={{position: "absolute", width: "100%", bottom: "-60px"}}>
              {success &&
                <div className={`text-center animate__animated animate__heartBeat `}>
                  <Button style={{width: "400px", backgroundColor: "#6FB812", border: "none"}}><img
                    height={"20px"} src={require("../assets/images/Vector@2x.png")} alt=""/> Result saved</Button>
                </div>
              }
            </div>
          </div>

        </div>
      </div>
      <div>
        <div>
          <div>
            <Button onClick={() => {
              setSetting(true)
            }} className={"bg-light"} size={"lg"} style={{fontSize: "16px", color: "#0a0a0a"}}>Setting</Button>
          </div>
          <div className={"mt-3"}>
            <Button onClick={handleLogin} className={"bg-light"} size={"lg"}
                    style={{fontSize: "16px", color: "#0a0a0a"}}>Logout</Button>
          </div>
        </div>
      </div>

      {/*  <br/>*/}
      {/*<div className={"d-flex justify-content-center mt-4"}>*/}
      {/*  <Button onClick={dandleSpin} variant="contained" >*/}
      {/*    Spin*/}
      {/*  </Button>*/}
      {/*</div>*/}


    </div>

  )
}
export default HomePage