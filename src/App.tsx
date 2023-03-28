import { useEffect, useState } from 'react';
import * as C from './App.styles';

import logoImage from './assets/devmemory_logo.png';
import restart from './svgs/restart.svg';

import { Button } from './components/Button';
import { InfoItem } from './components/InfoItem';
import { GridItemType } from './types/GridItemType';
import { items } from './data/items';
import { GridItem } from './components/GridItem';
import { timeElapsedCount } from './helpers/timeElapsedCount';

export const App = () => {

  const [playing, setPlaying] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [shownCount, setShownCount] = useState<number>(0);
  const [gridItem, setGridItem] = useState<GridItemType[]>([]);

  useEffect(() => resetAndCreateGrid(), []);
  useEffect(() => {
    const timer = setInterval(() => {
      if (playing) {
        setTimeElapsed(timeElapsed + 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [timeElapsed, playing]);

  useEffect(() => {
    if (shownCount === 2) {
      let opened = gridItem.filter(item => item.shown === true)
      if (opened.length === 2) {
        if (opened[0].item === opened[1].item) {
          let tmpGrid = [...gridItem];
          for (let i in tmpGrid) {
            if (tmpGrid[i].shown) {
              tmpGrid[i].permanentShown = true;
              tmpGrid[i].shown = false;
            }
          }
          setGridItem(tmpGrid);
          setShownCount(0);
        } else {
          setTimeout(() => {
            let tmpGrid = [...gridItem];
            for (let i in tmpGrid) {
              tmpGrid[i].shown = false;
            }
            setGridItem(tmpGrid);
            setShownCount(0);
          }, 1000)
        }
      }
      setMoveCount(moveCount + 1);
    }
  }, [shownCount, gridItem])

  useEffect(() => {
    if(moveCount > 0 && gridItem.every(item => item.permanentShown === true)){
      setPlaying(false);
    }
  }, [gridItem, moveCount])

  const resetAndCreateGrid = () => {
    // passo 1 - resetar o jogo
    setTimeElapsed(0);
    setMoveCount(0);
    setShownCount(0);

    // passo 2 - criar o grid
    // passo 2.1 - criar um grid vazio
    let tmpGrid: GridItemType[] = [];
    for (let i = 0; i < (items.length * 2); i++) tmpGrid.push({
      item: null, shown: false, permanentShown: false
    });

    // passo 2.2 - preencher o grid;
    for (let w = 0; w < 2; w++) {
      for (let i = 0; i < items.length; i++) {
        let pos = -1;
        while (pos < 0 || tmpGrid[pos].item !== null) {
          pos = Math.floor(Math.random() * (items.length * 2))
        }
        tmpGrid[pos].item = i;
      }
    }
    setGridItem(tmpGrid);

    // passo 3 - iniciar o jogo
    setPlaying(true);
  }

  const handleItemClick = (index: number) => {
    if (playing && index !== null && shownCount < 2) {
      let tmpGrid = [...gridItem];

      if (tmpGrid[index].permanentShown === false && tmpGrid[index].shown === false) {
        tmpGrid[index].shown = true;
        setShownCount(shownCount + 1);
      }
      setGridItem(tmpGrid);
    }
  }

  return (
    <C.Container>

      <C.Info>
        <C.LogoLink href="">
          <img src={logoImage} width="200" alt="" />
        </C.LogoLink>

        <C.InfoArea>
          <InfoItem label='Tempo' value={timeElapsedCount(timeElapsed)} />
          <InfoItem label='Movimentos' value={moveCount.toString()} />
        </C.InfoArea>

        <Button label="Reiniciar" icon={restart} onClick={resetAndCreateGrid}></Button>
      </C.Info>
      <C.GridArea>

        <C.Grid>
          {gridItem.map((item, index) => (
            <GridItem
              key={index}
              card={item}
              onClick={() => handleItemClick(index)}
            />
          ))}
        </C.Grid>

      </C.GridArea>
    </C.Container>
  )
};

export default App;