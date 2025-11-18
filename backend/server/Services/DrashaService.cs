using OpenAI.Chat;
using server.Models;
using System.Text.Json;

namespace server.Services
{
    public class StyleMap : Dictionary<string, string> { }

    public class DrashaService
    {
        private readonly StyleMap _styleMap;

        public DrashaService(string stylesJsonPath)
        {
            var json = File.ReadAllText(stylesJsonPath);
            _styleMap = JsonSerializer.Deserialize<StyleMap>(json) ?? new StyleMap();
        }

        public ChatMessage[] BuildMessages(DrashaFilters filters)
        {
            string styleExplanation = _styleMap.ContainsKey(filters.Style)
                ? _styleMap[filters.Style]
                : "There is no definition for this style in the style file";

            var systemMessage = new SystemChatMessage(
                @"You are a knowledgeable Jewish rabbi well-versed in the Torah, Midrash, Talmud, Rishonim, and Acharonim.
                You write Divrei Torah in natural, authentic Hebrew with depth, warmth, and a human tone.
                Avoid any phrasing that suggests artificial intelligence or automated writing."
            );

            var userMessage = new UserChatMessage(
                 $@"Write a Dvar Torah in Hebrew according to the following attributes:

                Parasha: {filters.Parasha}
                Topic: {filters.Topic}
                Category: {filters.Category}
                Length: {filters.Length}

                Style: {filters.Style}
                Style Explanation:
                {styleExplanation}

                Guidelines:
                - Cite only real, authentic sources. If no suitable source exists, do not invent one.
                - When quoting a verse or Midrash, specify the source immediately (book, chapter, verse).
                - Integrate a clear spiritual message and meaningful insight.
                - The writing must feel fully human, natural, and expressive—never robotic.
                - Use rich yet accessible Hebrew, suitable for spoken or written Divrei Torah.
                "
            );

            return [systemMessage, userMessage];
        }
    }
}
