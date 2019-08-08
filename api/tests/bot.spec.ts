import Bot from "../services/bot";

test("should return 'movie list in Array []'", () => {
  const bot = new Bot();

  expect(bot.request()).toEqual([
    {
      thumbImg: "https://placeholder.com/100/100",
      title: "The Mist",
      url: "https://www.youtube.com",
    },
  ]);
});
