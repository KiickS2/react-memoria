import * as C from './styles';
import b7svg from '../../svgs/b7.svg';
import { GridItemType } from '../../types/GridItemType';
import { items } from '../../data/items';

type Props = {
    card: GridItemType;
    onClick: () => void;
}

export const GridItem = ({card, onClick}: Props) => {
    
    return (
        <C.Container onClick={onClick} showBackGround={card.permanentShown || card.shown}>
            {card.permanentShown === false && card.shown === false &&
                <C.Icon src={b7svg} opacity={.3} alt=""/>
            }
            {(card.permanentShown || card.shown) && card.item !== null &&
                <C.Icon src={items[card.item].icon} alt="" />
            }
        </C.Container>
    )
}