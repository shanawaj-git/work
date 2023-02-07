import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


public class RemoveDuplicate {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        int noOfSentence = scanner.nextInt();
        List<String> sentences = new ArrayList();

        for (int i = 0; i < noOfSentence; i++) {
            sentences.add(scanner.nextLine());
        }
        scanner.close();
        String pattern = "\\b(\\w+)(\\s+\\1)+\\b";
        String replace = "$1";

        // Compile regular expression
        Pattern p = Pattern.compile(pattern, Pattern.CASE_INSENSITIVE);

        // Match regular expression to sentence
        List<String> nonDuplicates=new ArrayList();
        for(String s:sentences) {
            Matcher m = p.matcher(s);
            String output = m.replaceAll(replace);
            nonDuplicates.add(output);

        }
        for (String s: nonDuplicates)
        {
            System.out.println(s);
        }
    }
}
