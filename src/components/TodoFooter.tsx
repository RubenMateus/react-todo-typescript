import React from 'react';
import { Store } from '../store';
import { Stack, Text, DefaultButton } from 'office-ui-fabric-react';

interface TodoFooterProps {
  clear: () => void;
  todos: Store['todos'];
}

export const TodoFooter = (props: TodoFooterProps) => {
  const itemCount = Object.keys(props.todos).filter(id => !props.todos[id].completed).length;

  return (
    <Stack>
      <Text>
        {itemCount} item{itemCount <= 1 ? '' : 's'} left
      </Text>
      <DefaultButton onClick={() => props.clear()} className="button">
        Clear Completed
      </DefaultButton>
    </Stack>
  );
};
