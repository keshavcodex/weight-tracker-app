import { useState } from 'react';
import { Pressable } from 'react-native';
import { List } from 'react-native-paper';
import themeModal from '../theme/theme';
import { red100 } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

interface AccordianProps {
  title?: string;
  items: string[];
  selectedGraph?: string;
  setSelectedGraph?: any;
}

const Accordian = (props: AccordianProps) => {
  const theme = themeModal();
  const [expanded, setExpanded] = useState(false);
  const { title, items, selectedGraph, setSelectedGraph } = props;

  const handleExpansion = () => setExpanded(!expanded);

  const handleListPress = (item: string) => {
      setSelectedGraph(item);
      handleExpansion();
  };

  return (
    <List.Accordion
      title={title}
      left={props => <List.Icon {...props} icon="graph" />}
      theme={{ colors: theme }}
      expanded={expanded}
      onPress={handleExpansion}>
      {items.map((item: string, index) => {
        return (
          <Pressable key={index} onPress={() => handleListPress(item)}>
            <List.Item
              title={item}
              titleStyle={{
                color:
                  selectedGraph === item
                    ? theme.primary
                    : theme.fullColorInverse,
                textDecorationLine:
                  selectedGraph === item ? 'underline' : 'none',
              }}
            />
          </Pressable>
        );
      })}
    </List.Accordion>
  );
};

export default Accordian;
