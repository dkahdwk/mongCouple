import React, { useRef, useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CommonRow, CommonText } from 'styles/styles';
import { generateResponse } from 'query/api/chatGPT';
import { Keyboard, TextInput } from 'react-native';
import { theme } from 'styles/theme';
import CustomKeyboardAwareScrollView from 'components/custom/CustomKeyboardAwareScrollView';
import CustomTextInput from 'components/custom/CustomTextInput';
import CustomPressable from 'components/custom/CustomPressable';
import CustomMotiView from 'components/custom/CustomMotiView';
import styled, { css } from '@emotion/native';
import Header from 'components/ui/Header';
import Loader from 'components/ui/Loader';

const example = [
  `"하루 1800kcal 식단을 추천해 줘!"`,
  `"오늘 내가 먹은 음식은 이런데 어떻게 생각해?"`,
  `"요즘 피곤한데 에너지를 높이는 음식이 있을까?"`,
];

const AiChatScreen = () => {
  const scrollRef = useRef<KeyboardAwareScrollView>(null);
  const textInputRef = useRef<TextInput>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [value, setValue] = useState<string>('');

  const sendMessage = async () => {
    if (!value.trim()) return;
    const newMessages = [...messages, { role: 'user', content: value }];
    Keyboard.dismiss();
    setMessages(newMessages);
    setValue('');
    setIsLoading(true);
    setTimeout(() => {
      scrollRef.current?.scrollToEnd();
    }, 300);

    try {
      const botResponse = await generateResponse(value, messages);
      setMessages([...newMessages, { role: 'assistant', content: botResponse }]);
      setTimeout(() => {
        scrollRef.current?.scrollToEnd();
      }, 300);
    } catch (error) {
      setMessages([
        ...newMessages,
        { role: 'assistant', content: 'Error: Failed to get response' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <CustomKeyboardAwareScrollView
        ref={scrollRef}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 16,
          backgroundColor: '#FAF3E0',
        }}
      >
        <MessageSideContainer>
          <MessageContainer isAnswer={false} animation={'fade'} duration={800}>
            <AnswerLogo source={require('assets/icons/cute.png')} />
            <MessageBox isAnswer={false}>
              <CommonText size={15}>
                안녕하세요! 무엇이든 질문해 주세요 😊
                {'\n'}
                {'\n'}💡 AI 활용 예시
              </CommonText>
              {example.map((item) => (
                <CommonRow key={item} alignItems={'flex-start'}>
                  <CommonText marginLeft={8} marginRight={4}>
                    ▪︎
                  </CommonText>
                  <CommonText>{item}</CommonText>
                </CommonRow>
              ))}
            </MessageBox>
          </MessageContainer>
          {messages.map((msg, index) => {
            const isAnswer = index % 2 === 0;

            return (
              <MessageContainer
                key={`${msg.id}-${index}`}
                isAnswer={isAnswer}
                animation={'fade'}
                duration={isAnswer ? undefined : 400}
              >
                {!isAnswer && <AnswerLogo source={require('assets/icons/cute.png')} />}
                <MessageBox isAnswer={isAnswer}>
                  <CommonText size={15}>{msg.content}</CommonText>
                </MessageBox>
              </MessageContainer>
            );
          })}
          {isLoading && (
            <MessageContainer key={'loading'} isAnswer={false} animation={'fade'}>
              <AnswerLogo source={require('assets/icons/cute.png')} />
              <MessageBox isAnswer={false}>
                <Loader
                  containerStyle={{ backgroundColor: theme.colors.primary80 }}
                  color={theme.colors.primary100}
                  mode={'DotIndicator'}
                  size={6}
                />
              </MessageBox>
            </MessageContainer>
          )}
        </MessageSideContainer>
        <InputContainer>
          <CustomTextInput
            ref={textInputRef}
            textContainerStyle={{ backgroundColor: '#fff' }}
            containerStyle={{ flex: 1, height: 42.5 }}
            placeholder={'질문해보세요!'}
            isDisabled={isLoading}
            value={value}
            onChangeText={(text) => setValue(text)}
          />
          <CustomPressable style={{ marginLeft: 16 }} onPress={sendMessage}>
            {isLoading ? (
              <Loader containerStyle={{ width: 21.3, height: 21.3 }} size={20} />
            ) : (
              <MessageIcon source={require('assets/icons/send_message.png')} />
            )}
          </CustomPressable>
        </InputContainer>
      </CustomKeyboardAwareScrollView>
    </>
  );
};

const MessageSideContainer = styled.View`
  flex: 1;
  padding: 0 0 24px 0;
`;

const MessageContainer = styled(CustomMotiView)<{ isAnswer: boolean }>`
  flex-direction: row;
  align-items: flex-start;
  margin: 20px 0 0 0;
  ${(props) =>
    !props.isAnswer
      ? css`
          margin-right: 8px;
        `
      : css`
          justify-content: flex-end;
          margin-left: 8px;
        `};
`;

const AnswerLogo = styled.Image`
  width: 32px;
  height: 32px;
  margin: 2.5px 8px 0 0;
`;

const MessageBox = styled.View<{ isAnswer: boolean }>`
  ${(props) => css`
    flex-shrink: 1;
    padding: 6px 12px 6px 12px;
    border-radius: 20px;
    ${props.isAnswer
      ? css`
          /* background-color: ${props.theme.colors.primary100}; */
          background-color: #cce5ff;
        `
      : css`
          background-color: ${props.theme.colors.primary80};
        `}
  `}
`;

const InputContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0 20px 0;
  background-color: #fdf7e3;
`;

const MessageIcon = styled.Image`
  width: 21.3px;
  height: 21.3px;
  tint-color: ${(props) => props.theme.colors.primary100};
`;

export default AiChatScreen;
