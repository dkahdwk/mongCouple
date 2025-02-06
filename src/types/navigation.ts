import { FoodResponse } from 'query/types/food';

export type CustomStackParamList = {
  FoodDetailScreen: {
    item: FoodResponse;
  };
  FoodThemeListScreen: {
    item: any;
  };
  HomeMainScreen: undefined;
  FoodListScreen: undefined;
  AiChatScreen: undefined;
};
