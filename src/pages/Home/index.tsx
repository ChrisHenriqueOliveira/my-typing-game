/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState, useCallback, useMemo } from 'react';

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
  const handleGetTextMap = useCallback(() => {
    const max = textMaps.length;
    const min = 1;
    const selectedText = Math.floor(Math.random() * (max - min + 1) + min);

    const mapFiltered = textMaps.filter(map => {
      return map.id === selectedText;
    });
    return mapFiltered[0].text;
  }, []);

  const [gameText, setGameText] = useState(handleGetTextMap);
  const [splittedGameText, setSplittedGameText] = useState<string[]>([]);
  const [userText, setUserText] = useState('');

  const [totalAccuracy, setTotalAccuracy] = useState(0);
  const [timer, setTimer] = useState();

  const handleType = useCallback(e => {
    setUserText(e.currentTarget.value);
  }, []);

  const handleNewText = useCallback(() => {
    const newText = handleGetTextMap();
    setGameText(newText);

    setTimer('00:00');
    setUserText('');
  }, [handleGetTextMap]);

  const handleReset = useCallback(() => {
    setTimer('00:00');
    setUserText('');
  }, []);

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
      console.log('acabou');
    }
  }, [gameText.length, splittedGameText, userText]);

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
          <div>
            <button type="button" onClick={handleNewText}>
              New text
            </button>
            <button type="button" onClick={handleReset}>
              Reset
            </button>
          </div>
          <h2>{timer}</h2>
          <div>
            <h2>{`${totalAccuracy}/${gameText.length}`}</h2>
          </div>
        </ProgressArea>
        <TypingArea value={userText} onChange={e => handleType(e)} />
      </Content>
    </Container>
  );
};

export default Dashboard;
