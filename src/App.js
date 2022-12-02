import React, { useState, useEffect } from 'react';
import alanBtn from "@alan-ai/alan-sdk-web";
import NewsCards from './components/newsCards/newsCards';
import useStyles from "./styles"
import wordsToNumbers from 'words-to-numbers'

const alanKey = process.env.REACT_APP_Alan_Key;
const App = () => {
    const classes = useStyles();
    const [activeArticles, setActiveArticles] = useState(-1);
    const [newsArticles, setNewsArticles] = useState([]);

    useEffect(() => {
        alanBtn({
            key: alanKey,
            onCommand: ({ command, articles, number }) => {
                if (command === 'newHeadlines') {
                    setNewsArticles(articles);
                    setActiveArticles(-1);
                } else if (command === 'highlight') {
                    setActiveArticles((prevActiveArticles) => prevActiveArticles + 1);
                } else if (command === 'open') {
                    const parsedNumber = number.length > 2 ? wordsToNumbers(number, { fuzzy: true }) : number;
                    const article = articles[parsedNumber - 1];
                    if (parsedNumber > 20) {
                        alanBtn().playText("Please try that again.")
                    } else if (article) {
                        window.open(article.url, '_blank');
                        alanBtn().playText('Opening..');
                    }
                }
            }
        })
    }, [])

    return ( < div >
        <nav className={classes.navBar}>
            <h3>NLP Project Alan AI Web App</h3>
        </nav>
        <div className = { classes.logoContainer }>
              <img src = "https://www.wpp.com/-/media/project/wpp/images/voices/ai-and-the-personalised-marketing-approach-of-the-future-min.jpg" className = { classes.alanLogo } alt = "alan-logo" / >
          </div> <NewsCards articles = { newsArticles }activeArticles = { activeArticles }/> 
          <footer className={classes.foot}>
                <h4>Alan AI Web App minor project 2022</h4>
          </footer>
        </div >
    );
}

export default App;