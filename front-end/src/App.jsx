import { Button, Col, Form, Row } from "react-bootstrap";
import Drawer from "react-drag-drawer";
import { useEffect, useState } from "react";
import axios from "axios";
import isEmail from 'validator/es/lib/isEmail';
import isMobilePhone from 'validator/es/lib/isMobilePhone';

function App() {
  const [name, setName] = useState("")
  const [nameError, setNameError] = useState("")
  const [number, setNumber] = useState("")
  const [numberError, setNumberError] = useState("")
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  // ==============
  const [offersToggle, setOffersToggle] = useState(false);
  const [interestToggle, setInterestToggle] = useState(false);
  const [thankMsgToggle, setThankMsgToggle] = useState(false);
  const [offers, setOffers] = useState([]);
  const [interests, setInterests] = useState([]);
  const [selectedOffers, setSelectedOffers] = useState([]);
  // ===================
  const isSelectedOffer = (offer) => {
    const isSelected = selectedOffers.find((sOffer) => offer == sOffer);
    return isSelected ? "primarySelected" : "primaryNotSelected";
  };
  const SelectOfferToggle = async (offer) => {
    const index = selectedOffers.indexOf(offer);
    if (index >= 0) {
      let temp = selectedOffers;
      temp.splice(index, 1);
      setSelectedOffers(temp);
    } else {
      let temp = selectedOffers;
      temp.push(offer);
      setSelectedOffers(temp);
    }
    UpdateOffersButton();
  };
  // ===========
  const UpdateOffersButton = () => {

    let offersButtonTEMP = offers.map((offer) => (
      <Col>
        <Button
          onClick={() => SelectOfferToggle(offer.serviceName)}
          variant={isSelectedOffer(offer.serviceName)}
          block
        >
          {offer.serviceName}
        </Button>
      </Col>
    ));
    setOffersButton(offersButtonTEMP);
  };
  //  ================
  let offersButtonTEMP = offers.map((offer) => (
    <Col>
      <Button
        onClick={() => SelectOfferToggle(offer.serviceName)}
        variant={isSelectedOffer(offer.serviceName)}
        block
      >
        {offer.serviceName}
      </Button>
    </Col>
  ));
  const [offersButton, setOffersButton] = useState(offersButtonTEMP);
  // ===================== send Email
  const sendEmail = (interest) => {
    const obj = {
      name, email, number, selectedOffers, interest
    }
    axios.post("http://localhost:5050/api/sendEmail", obj)
      .then(() => {
        setName("")
        setNumber("")
        setEmail("")
      })
      .catch(e => {
        console.error(e)
      })
  }
  // =================== get Data From Backend
  const getDataFromBackend = async (dataRoute) => {
    return axios.get("http://localhost:5050/api/" + dataRoute)
  }
  // -------------- Form Handler
  const formHandler = (e) => {
    e.preventDefault();
    setEmailError("")
    setNumberError("")
    setNameError("")
    setSelectedOffers([])
    selectedOffers.length = 0;
    if (!isEmail(email) || !isMobilePhone(number) || !name.length) {
      if (!isEmail(email)) {
        setEmailError("البريد الالكتروني غير صحيح.");
      }
      if (!isMobilePhone(number)) {
        setNumberError("رقم الجوال غير صحيح.")
      }
      if (!name.length) {
        setNameError("يجب ادخل اسم.")
      }

    }
    else {
      if (!offers.length) {
        getDataFromBackend("services")
          .then((res) => {
            setOffers(res.data)
            offers.push(...res.data)
          })
          .then(() => {
            UpdateOffersButton()
          })
          .then(() => {
            setOffersToggle(true)
          })
      }
      else {
        UpdateOffersButton()
        setOffersToggle(true)
      }

    }
  }
  const offersDrawerSubmit = () => {
    getDataFromBackend("interests")
      .then((res) => {
        interests.push(...res.data)
        setInterests(res.data)
      })
      .then(() => {
        setOffersToggle(false)
        setInterestToggle(true)
      })

  }
  return (
    <div className="registerPage">
      <div className="formContainer">
        <h1>LOGO</h1>
        <Form onSubmit={formHandler}>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>الاسم</Form.Label>
            <Form.Control isInvalid={nameError} type="text" value={name}
              onChange={(e) => {
                setName(e.target.value)
                setNameError("")
              }} />
            <Form.Control.Feedback type="invalid">
              {nameError}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>الجوال</Form.Label>
            <Form.Control isInvalid={numberError} type="text" value={number}
              onChange={(e) => {
                setNumber(e.target.value)
                setNumberError("")
              }} />
            <Form.Control.Feedback type="invalid">
              {numberError}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>البريد الالكتروني</Form.Label>
            <Form.Control isInvalid={emailError} type="email" value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setEmailError("")
              }} />
            <Form.Control.Feedback type="invalid">
              {emailError}
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit" block>
            ارسال
          </Button>
        </Form>
      </div>
      <Drawer open={offersToggle}>
        <div className="Drawer">
          <Button variant="light" onClick={() => setOffersToggle(false)}>X</Button>
          <hr />
          <p>اختر عرض او اكثر من العروض التالية</p>
          <Row xs={1} md={2} lg={3}>
            {offersButton}
          </Row>
          <Button variant="primary" className="mt-3" block
            disabled={selectedOffers.length ? false : true}
            onClick={() => {
              offersDrawerSubmit()
            }}>
            التالي
          </Button>
          <hr />
          <Button variant="light" onClick={() => setOffersToggle(false)}>اغلاق</Button>
        </div>
      </Drawer>

      <Drawer open={interestToggle}>
        <div className="Drawer">
          <Button variant="light" onClick={() => setInterestToggle(false)}>X</Button>
          <hr />
          <p>متى ترغب برفع الطلب</p>
          <Row xs={1} md={2} lg={3}>
            {
              interests.map(interest => (
                <Col>
                  <Button variant="primary" className="mt-3" block
                    onClick={() => {
                      sendEmail(interest.interest)
                      setInterestToggle(false)
                      setThankMsgToggle(true)
                    }}>
                    {interest.interest}
                  </Button>
                </Col>
              ))
            }

          </Row>

          <hr />
          <Button variant="light" onClick={() => setInterestToggle(false)}>اغلاق</Button>
        </div>
      </Drawer>
      <Drawer open={thankMsgToggle}>
        <div className="Drawer">
          <Button variant="light" onClick={() => setThankMsgToggle(false)}>X</Button>
          <hr />
          <p>شكرا لهتمامك في خدماتنا <br /> سوف يصلك بريد الكتروني بالتفاصيل قريبا</p>
          <hr />
          <Button variant="light" onClick={() => setThankMsgToggle(false)}>اغلاق</Button>
        </div>
      </Drawer>

    </div>
  );
}

export default App;