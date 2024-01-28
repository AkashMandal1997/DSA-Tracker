import React, { useContext } from "react";
import Card from "react-bootstrap/Card";
import ProgressBar from "react-bootstrap/ProgressBar";
import Badge from "react-bootstrap/Badge";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Fade from "react-reveal/Fade";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../App";

import "./topicCard.css";

export default function TopicCard({ questionData }) {
  const dark = useContext(ThemeContext);

  
  const findPercentage = (doneQuestions, totalQuestions) => {
    return Math.round((doneQuestions / totalQuestions) * 100);
  };

  let totalSolved = 0;
  let totalQuestions = 0;

  
  const orderedQuestionData = [
    ...questionData.filter(topic => topic.topicName.toLowerCase().includes("string")),
    ...questionData.filter(topic => topic.topicName.toLowerCase().includes("array")),
    ...questionData.filter(topic => topic.topicName.toLowerCase().includes("matrix")),
    ...questionData.filter(topic => topic.topicName.toLowerCase().includes("linked list")),
    ...questionData.filter(topic => topic.topicName.toLowerCase().includes("stack")),
    ...questionData.filter(topic => topic.topicName.toLowerCase().includes("bit manipulation")),
    ...questionData.filter(topic => topic.topicName.toLowerCase().includes("search ")),
    ...questionData.filter(topic => topic.topicName.toLowerCase().includes("trie")),
    ...questionData.filter(topic =>
      !topic.topicName.toLowerCase().includes("string") &&
      !topic.topicName.toLowerCase().includes("array") &&
      !topic.topicName.toLowerCase().includes("matrix") &&
      !topic.topicName.toLowerCase().includes("linked list") &&
      !topic.topicName.toLowerCase().includes("stack") &&
      !topic.topicName.toLowerCase().includes("queue") &&
      !topic.topicName.toLowerCase().includes("bit manipulation") &&
      !topic.topicName.toLowerCase().includes("search") &&
      !topic.topicName.toLowerCase().includes("sort") &&
      !topic.topicName.toLowerCase().includes("trie")
    )
  ];

  
  let topicCard = orderedQuestionData.map((topic, index) => {
    let { topicName, doneQuestions, questions, started } = topic;
    let percentDone = findPercentage(doneQuestions, questions.length);
    let questionsRemaining = questions.length - doneQuestions;
    totalSolved += doneQuestions;
    totalQuestions += questions.length;

    if (started) {
      return (
        <Fade duration={500 + index * 0.4} key={index}>
          <div className="col mb-4">
            <Link
              to={`/${topic.topicName.replace(/[^A-Z0-9]+/gi, "_").toLowerCase()}`}
              style={{ textDecoration: "none" }}
            >
              <Card className={`mb-3 inprogress-card animate__slideInDown hvr-grow ${dark ? "darkCard" : ""}`}>
                <Card.Body>
                  <Row>
                    <Col>
                      <Card.Title className="topicName">{topic.topicName}</Card.Title>
                    </Col>
                    <Col>
                      <h4>
                        <Badge pill variant="success" className="float-right" style={{ fontWeight: "500", cursor: "pointer" }}>
                          {questionsRemaining === 0 ? "Done 👏🏻" : "Solve Now 🙇🏻‍♂️"}
                        </Badge>
                      </h4>
                    </Col>
                  </Row>
                  <Card.Text className="totalQuestion">
                    Total Questions {topic.questions.length} <br />
                    {`${questionsRemaining}`} More to go
                  </Card.Text>
                  <p className="percentDone mb-1">
                    <b>{percentDone}% Done</b>
                  </p>
                  <ProgressBar animated={percentDone === 100 ? false : true} variant="success" now={percentDone} />
                </Card.Body>
              </Card>
            </Link>
          </div>
        </Fade>
      );
    } else {
      return (
        <Fade duration={500 + index * 50} key={index}>
          <div className="col mb-4">
            <Link
              to={`/${topic.topicName.replace(/[^A-Z0-9]+/gi, "_").toLowerCase()}`}
              style={{ textDecoration: "none" }}
            >
              <Card className={`mb-3 notstarted-card hvr-grow ${dark ? "darkCard" : ""}`}>
                <Card.Body>
                  <Row>
                    <Col>
                      <Card.Title className="topicName"> {topicName} </Card.Title>
                    </Col>
                    <Col>
                      <h4>
                        <Badge pill variant="primary" className="float-right" style={{ fontWeight: "500", cursor: "pointer" }}>
                          Start Now
                        </Badge>
                      </h4>
                    </Col>
                  </Row>
                  <Card.Text className="totalQuestion">Total Questions {questions.length}</Card.Text>
                  <p className="percentDone mb-1">
                    <b><i>Not yet started</i></b>
                  </p>
                </Card.Body>
              </Card>
            </Link>
          </div>
        </Fade>
      );
    }
  });

  return (
    <>
      <h1 style={{ color: '#cd8282' }} className="app-heading2 text-center mb-3">
        Solve DSA problem to master in DSA{" "}
      </h1>
      <br />
      <br />
      <h4 style={{ color: 'white' }} className="text-center mb-4">
        {totalSolved
          ? `Total Questions Solved : ${totalSolved} (${((totalSolved / totalQuestions) * 100).toFixed(2)}% Done)`
          : "Start Solving"}
        <br />
        <br />
        <p className="percentDone container mt-1">
          {totalSolved ? (
            <ProgressBar
              animated={((totalSolved / totalQuestions) * 100).toFixed(2) === "100" ? false : true}
              variant="success"
              now={((totalSolved / totalQuestions) * 100).toFixed(2)}
              style={{ margin: "0.2em 5em" }}
            />
          ) : null}
        </p>
      </h4>
      <div className="container container-custom">
        <div className="row row-cols-1 row-cols-md-3 mt-3 grids">{topicCard}</div>
      </div>
    </>
  );
}
