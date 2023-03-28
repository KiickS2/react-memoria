import * as C from './styles';

type Props = {
    value: string;
    label: string;
}

export const InfoItem = ({ value, label }: Props) => {
    return (
        <C.Container>
            <C.Label>{label}</C.Label>
            <C.Value>{value}</C.Value>
        </C.Container>
    )
}