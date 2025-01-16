import { Button } from "react-native-paper";

interface EndGameButtonProps {
  openEndGameModal: () => void;
}
export default function EndGameButton({
  openEndGameModal,
}: EndGameButtonProps) {
  return (
    <Button mode="contained" onPress={() => openEndGameModal()}>
      End game
    </Button>
  );
}
