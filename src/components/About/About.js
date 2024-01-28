import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Badge from "react-bootstrap/Badge";
import Spinner from "react-bootstrap/Spinner";
import Fade from "react-reveal/Fade";

export default function About({ resetData, exportData, importData }) {
    const inputFile = useRef(null);
    let history = useNavigate();
    const [importSpinnerState, setImportSpinnerState] = useState(false);
    const [exportSpinnerState, setExportSpinnerState] = useState(false);

    function handleChange(e) {
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = (e) => {
            const JSONData = JSON.parse(e.target.result);
            importData(JSONData, () => {
                setImportSpinnerState(false);
                history.push("/");
            });
        };
    }

    return (
        <div className="container">
            <Fade duration={500}>
                <div className="container my-5">
                    <Alert variant="success">
                        <h2  className="text-center mb-4">Welcome to DSA Tracker!</h2>
                        <p className="text-center" style={{ fontSize: "1.2rem" }}>
                           <p> This project has been collaboratively developed by Priyam Sinha,  Abhishek Basak, Akash Mandal, Bishal Roy, Subhadeep  Mukherjee, and Ankit Kumar.   We are pleased to introduce a new feature aimed at enhancing your learning journey in data structures and algorithms (DSA). we are launching a progressive tracking system to monitor your advancement in DSA proficiency.             </p>                                                                                                                         
                            <p> Our mission is to furnish students and professionals alike with a robust platform designed to bolster their DSA capabilities and refine their preparation for technical assessments. With the introduction of this tracking mechanism, you will have a structured framework to monitor your progress systematically, thereby empowering you to identify areas for improvement and track your growth over time.                      </p>
                            <p> We believe that by offering this comprehensive tracking solution, we can facilitate your journey towards mastering DSA concepts and excelling in technical interviews.</p>                                                                                                                                                       
                        </p>
                        
                    </Alert>
                </div>
                <div className="container my-5">
                    <h3  style={{ color: 'white' }} className="text-center mb-4">
                        DSA Tracker - Your Personal Progress Tracker
                    </h3>
                    <p style={{ color: 'black' , fontSize: '30px' }} className="text-center">
                        Built based on the{" "}
                        <a
                            href="https://drive.google.com/file/d/1FMdN_OCfOI0iAeDlqswCiC2DZzD4nPsb/view"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-decoration-none" 
                            style={{ color: 'blue' , fontSize: '30px' }}
                        >
                            DSA Sheet By Love Babbar
                        </a>
                    </p>

                    <div className="text-center">
                        <Badge
                            variant="danger"
                            className="me-3 py-2 px-3 reset-badge"
                            style={{ backgroundColor: "#F13030", borderRadius: "8px", textDecoration: "none", fontSize: "16px" }}
                            onClick={() => {
                                if (window.confirm("Are you sure you want to reset the progress !")) {
                                    setExportSpinnerState(true);
                                    resetData();
                                }
                            }}
                        >
                            Reset Progress
                            <Spinner animation="border" variant="light" size="sm" className={exportSpinnerState ? '' : 'd-none'} />
                        </Badge>
                        <Badge
                            variant="warning"
                            className="me-3 py-2 px-3 export-badge"
                            style={{ backgroundColor: "#ffffcc", borderRadius: "8px", fontSize: "16px" }}
                            onClick={() => {
                                setExportSpinnerState(true);
                                exportData(() => {
                                    setExportSpinnerState(false);
                                });
                            }}
                        >
                            Export Progress
                        </Badge>
                        <Badge
                            variant="primary"
                            className="py-2 px-3 import-badge"
                            style={{ backgroundColor: "#ccffcc", borderRadius: "8px", textDecoration: "none", fontSize: "16px" }}
                            onClick={() => {
                                setImportSpinnerState(true);
                                inputFile.current.click();
                            }}
                        >
                            Import Progress{" "}
                            <Spinner animation="border" variant="light" size="sm" className={importSpinnerState ? '' : 'd-none'} />
                        </Badge>
                    </div>
                    <input type="file" id="file" ref={inputFile} style={{ display: "none" }} accept=".json" onChange={handleChange} />
                </div>
            </Fade>
        </div>
    );
}
