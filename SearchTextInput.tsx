import React, {useState, useCallback} from 'react';

import {TextInput} from 'react-native';

const SearchTextInput = ({onChangeText, ...props}) => {
  const [typingTimeout, setTypingTimeout] = useState(0);

  const handleTextChange = useCallback(
    text => {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }

      setTypingTimeout(
        setTimeout(() => {
          onChangeText && onChangeText(text);
        }, 700),
      );
    },
    [typingTimeout],
  );

  return <TextInput onChangeText={handleTextChange} {...props} />;
};

export default SearchTextInput;
