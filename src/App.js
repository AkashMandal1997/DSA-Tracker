import { React, useState, useEffect, createContext } from "react";
import { Route, Routes } from "react-router-dom";
import { getData, updateDBData, resetDBData, exportDBData, importDBData } from "./services/dbServices";
import Spinner from "react-bootstrap/Spinner";
import { saveAs } from "file-saver";
import "bootstrap/dist/css/bootstrap.min.css";
import TopicCard from "./components/TopicCard/TopicCard";
import About from "./components/About/About";
import Footer from "./components/Footer/Footer";
import './App.css';
import Topic from "./components/Topic/Topic";






export const ThemeContext = createContext(null);

function App() {
	

	const [questionData, setquestionData] = useState([]);

	
	const [dark, setDark] = useState(false);


	
	useEffect(() => {
		localStorage.removeItem("cid");

		getData((QuestionData) => {
			setquestionData(QuestionData);
		});

		
		
		if (!("isDark" in window.localStorage)) {
			window.localStorage.setItem("isDark", dark);
		} else {
			
			let temp = window.localStorage["isDark"];
			if (temp === "false") {
				setDark(false);
			} else {
				setDark(true);
			}
		}
	}, [dark]);

	
	function updateData(key, topicData, topicPosition) {
		let reGenerateUpdatedData = questionData.map((topic, index) => {
			if (index === topicPosition) {
				updateDBData(key, topicData);
				return { topicName: topic.topicName, position: topic.position, ...topicData };
			} else {
				return topic;
			}
		});
		setquestionData(reGenerateUpdatedData);
	}

	
	function resetData() {
		resetDBData((response) => {
			setquestionData([]);
			window.location.replace(window.location.origin);
		});
	}

	
	function exportData(callback) {
		exportDBData((data) => {
			const fileData = JSON.stringify(data);
			const blob = new Blob([fileData], { type: "text/plain" });
			saveAs(blob, "progress.json");
			callback();
		});
	}

	

	function importData(data, callback) {
		importDBData(data, (QuestionData) => {
			setquestionData(QuestionData);
			callback();
		});
	}

	return (
		<div className={dark ? "App dark" : "App"}>
			{/* <h1 className="app-heading" style={{ color: dark ? "white" : "" }}>
				<img className="img_logo" src={logo} alt="logo" />
				<div className="text-center float-sm-right">DSA Tracker</div>
				<br />
			</h1>
	 */}
			
		


		{questionData.length === 0 ? (
			
			<div className="d-flex justify-content-center">
				
			</div>
		) : (
			<>
				<ThemeContext.Provider value={dark}>

					<Routes>
						<Route exact path="/" element={<TopicCard questionData={questionData}></TopicCard>} />
						<Route
							path="/about"
							element={
								<About
									resetData={resetData}
									exportData={exportData}
									importData={importData}
									setQuestionData={setquestionData}
								></About>
							}
						/>


						<Route path="/array" element={<Topic data={questionData[0]} updateData={updateData} />} />
						<Route path="/matrix" element={<Topic data={questionData[1]} updateData={updateData} />} />
						<Route path="/string" element={<Topic data={questionData[2]} updateData={updateData} />} />
						<Route path="/search_sort" element={<Topic data={questionData[3]} updateData={updateData} />} />
						<Route path="/linked_list" element={<Topic data={questionData[4]} updateData={updateData} />} />
						<Route path="/binary_trees" element={<Topic data={questionData[5]} updateData={updateData} />} />
						<Route path="/bst" element={<Topic data={questionData[6]} updateData={updateData} />} />
						<Route path="/greedy" element={<Topic data={questionData[7]} updateData={updateData} />} />
						<Route path="/backtracking" element={<Topic data={questionData[8]} updateData={updateData} />} />
						<Route path="/stacks_queues" element={<Topic data={questionData[9]} updateData={updateData} />} />
						<Route path="/heap" element={<Topic data={questionData[10]} updateData={updateData} />} />
						<Route path="/graph" element={<Topic data={questionData[11]} updateData={updateData} />} />
						<Route path="/trie" element={<Topic data={questionData[12]} updateData={updateData} />} />
						<Route path="/dynamic_programming" element={<Topic data={questionData[13]} updateData={updateData} />} />



						<Route path="/bit_manipulation" element={<Topic data={questionData[14]} updateData={updateData} />} />
						<Route path="/" element={<App />} />
					</Routes>
				</ThemeContext.Provider>
			</>

		
		)}
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />

		<Footer dark={dark} setDark={setDark}></Footer>
	</div>
	);
}

export default App;

