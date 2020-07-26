/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState, useCallback } from 'react';

import { Progress } from 'semantic-ui-react';

import Menu from '../../components/Menu';

import { textMaps } from '../../utils/textMaps';

import {
  Container,
  Content,
  PreviewArea,
  ProgressArea,
  TypingArea,
} from './styles';

const Dashboard: React.FC = () => {
  const [gameDifficulty, setGameDifficulty] = useState('Easy');

  const handleGetTextMap = useCallback(() => {
    const max = 3;
    const min = 1;
    const selectedText = Math.floor(Math.random() * (max - min + 1) + min);

    const mapFiltered = textMaps.filter(map => {
      return map.id === selectedText && map.difficulty === gameDifficulty;
    });
    return mapFiltered[0].text;
  }, [gameDifficulty]);

  const [gameText, setGameText] = useState(handleGetTextMap);
  const [splittedGameText, setSplittedGameText] = useState<string[]>([]);
  const [userText, setUserText] = useState('');

  const [totalAccuracy, setTotalAccuracy] = useState(0);
  const [done, setDone] = useState(false);

  const [interv, setInterv] = useState<number>(0);
  const [timer, setTimer] = useState(0);

  const handleTimer = useCallback(() => {
    setTimer(value => value + 1);
  }, []);

  const handleType = useCallback(
    e => {
      if (userText.length < 1 && interv === 0) {
        setInterv(setInterval(handleTimer, 1000));
      }

      setUserText(e.currentTarget.value);
    },
    [handleTimer, interv, userText.length],
  );

  const handleReset = useCallback(() => {
    setTimer(0);
    setUserText('');
    clearInterval(interv);
    setInterv(0);
    setDone(false);
  }, [interv]);

  const handleNewText = useCallback(() => {
    const newText = handleGetTextMap();
    setGameText(newText);

    handleReset();
  }, [handleGetTextMap, handleReset]);

  useEffect(() => {
    const splittedText = gameText.split('');

    setSplittedGameText(splittedText);
  }, [gameText]);

  useEffect(() => {
    let accuracy = 0;
    splittedGameText.forEach((letter, index) => {
      if (letter === userText[index]) {
        accuracy += 1;
      }
    });
    setTotalAccuracy(accuracy);

    if (accuracy === gameText.length) {
      setDone(true);
      clearInterval(interv);
    }
  }, [gameText.length, handleReset, interv, splittedGameText, userText]);

  return (
    <Container>
      <Menu />
      <Content>
        <PreviewArea>
          {splittedGameText.map((letter, index) => {
            let color;
            if (index < userText.length) {
              color = letter === userText[index] ? '#dfffa0' : '#fcbea4';
            }
            return (
              <span key={index} style={{ backgroundColor: color }}>
                {letter}
              </span>
            );
          })}
        </PreviewArea>
        <ProgressArea>
          <div className="main-info">
            <div className="buttons">
              <div>
                <button type="button" onClick={handleNewText}>
                  New text
                </button>
                <button type="button" onClick={handleReset}>
                  Reset
                </button>
              </div>
              <select
                value={gameDifficulty}
                onChange={e => setGameDifficulty(e.currentTarget.value)}
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
            <h2>{timer} sec</h2>
          </div>
          <Progress percent={(totalAccuracy * 100) / gameText.length} success>
            {done ? (
              <h2 style={{ backgroundColor: '#dfffa0' }}>
                Congratulations! You are finished in {timer} seconds!
              </h2>
            ) : (
              `${totalAccuracy}/${gameText.length}`
            )}
          </Progress>
        </ProgressArea>
        <TypingArea value={userText} onChange={e => handleType(e)} />
      </Content>
    </Container>
  );
};

export default Dashboard;
