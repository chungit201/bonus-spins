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
  const [error, setError] = useState("");
  const [isPlay, setPlay] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioSpinRef = useRef<HTMLAudioElement>(null);
  const [flower, setFlower] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    setOdometerValue("100000");
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
      if (!max) {
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
    const {current}: any = audioSpinRef;
    current.play()
    setTotalSpin(totalSpin + 1)
    setOdometerValue("")
    setText(false)
    setSpined(true)
    setTimeout(() => {
      setSpined(false)
    }, 3200);
    setTimeout(() => {
      setShow(true);
      handlePausePlayClick()
      setFlower(true)
      setTimeout(() => {
        setFlower(false)
      }, 2500)
    }, 5500);

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

  const checkSuccess = () => {

  }
  const numberConfig = () => {
    if (textMax) {
      localStorage.setItem("max", textMax);
      setMax(textMax)
      setSetting(false);
      notification.success({message: "Installed update successfully"});
    } else {
      setError("Please enter max number.")
    }
  }
  const {current}: any = audioRef
  const handleLoadedData = () => {
    if (isPlay) current.play();
  };

  const handlePausePlayClick = () => {
    current.play();
    setPlay(!isPlay);
  };


  return (
    <div>

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
        <div style={{position: "absolute", top: "20px", right: "20px"}}>
          <div className={"d-flex"}>
            <Button onClick={() => {
              setSetting(true)
            }} className={"bg-light mx-2"} size={"lg"} style={{fontSize: "16px", color: "#0a0a0a"}}>Setting</Button>
            <Button onClick={handleLogin} className={"bg-light mx-2"} size={"lg"}
                    style={{fontSize: "16px", color: "#0a0a0a"}}>Logout</Button>
          </div>

        </div>
        <Modal
          show={setting}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          onHide={() => {
            setSetting(false)
          }}
          className={"modal-setting "}
        >

          <Modal.Header closeButton>
            <Modal.Title id=" contained-modal-title-vcenter " className={"w-100"}>
              <div className={"w-100 text-center"}>Setting</div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{padding: "50px"}}>
            <InputGroup className="mb-3">
              <Form.Control
                onChange={(e: any) => {
                  setError("")
                  setMax(e.target.value)
                  setTextMax(e.target.value)
                  if (e.target.value.length > 6) {
                    setError("Maximum number should not be more than 100000.")
                  }
                }}
                type={"number"}
                placeholder="Enter max number..."
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                value={textMax}
                max={10000}
                min={1}
              />
              {/*<Button disabled={textMax.length > 6 && true} onClick={numberConfig} variant="outline-secondary"*/}
              {/*        id="button-addon2">*/}
              {/*  Save*/}
              {/*</Button>*/}
            </InputGroup>
            {error && <div>
              <p className={"text-center"} style={{color: "red"}}>{error}</p>
            </div>}
            {textMax &&
              <h4 className={"text-center"}>{!textMax ? "Current largest number" : "Max ticket now"}: {textMax}</h4>}
            <div className={"d-flex justify-content-center"}>

              <Button onClick={maxTicket} className={"text-center mt-2"}>Get max ticket now</Button>
            </div>
          </Modal.Body>

          <div>
            <Row className={"w-100 m-0"}>
              <Col className={"p-0"} xl={6} xs={6}>
                <button onClick={() => {
                  setSetting(false)
                }} className={"p-3"} style={{width: "100%", border: 0, borderRight: "1px solid #ccc"}}>Cancel
                </button>
                {' '}
              </Col>
              <Col className={"p-0"} xl={6} xs={6}>
                <button disabled={textMax.length > 6 && true} onClick={numberConfig} className={"p-3"}
                        style={{width: "100%", border: 0}}>Save
                </button>
                {' '}
              </Col>
            </Row>
          </div>

        </Modal>
        <Modal
          show={show}
          size="lg"
          onHide={handleClose}
          centered
          className={"modal-spin-success animate__animated animate__tada"}

        >
          {flower &&
            <div>
              <img style={{position: "absolute", top: "-80px", left: "-100px"}} src={require("../../assets/gif_5.gif")}
                   alt=""/>
              <img style={{position: "absolute", top: "-80px", right: "-100px"}} src={require("../../assets/gif_5.gif")}
                   alt=""/>
            </div>
          }

          <Modal.Body>
            <div className={"text-center mt-4"}>
              <h1 style={{color: "#FFFFFF", fontWeight: 700}}>Player with ticket <span
                style={{color: "#00ff43"}}>{odometerValue.slice(1)}</span> have won the reward.</h1>
              <div style={{fontSize: "24px", color: "#FFFFFF"}}>Please DM admin to claim your reward.</div>
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
              <audio
                ref={audioRef}
                src={require("../../assets/spin-success.mp3")}
                onLoadedData={handleLoadedData}
                onEnded={() => setPlay(false)}
              />
              <audio
                ref={audioSpinRef}
                src={require("../../assets/Luckyspin-sound.mp3")}
                onLoadedData={handleLoadedData}
                onEnded={() => setPlay(false)}
              />
              {!spined ? (
                <div onClick={dandleSpin} className={"btn-spin animate__animated animate__bounceIn"}>
                  <div style={{position: "relative"}}>
                    <img width={"220px"} src={require("../assets/images/button_blue_12.png")} alt=""/>
                    <h3
                      style={{
                        position: "absolute",
                        bottom: "0px",
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
                        bottom: "0px",
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
        {/*  <br/>*/}
        {/*<div className={"d-flex justify-content-center mt-4"}>*/}
        {/*  <Button onClick={dandleSpin} variant="contained" >*/}
        {/*    Spin*/}
        {/*  </Button>*/}
        {/*</div>*/}


      </div>

    </div>
  )
}
export default HomePage
