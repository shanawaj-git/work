//import java.util.ArrayList;
//import java.util.List;
//import java.util.stream.Collectors;
//
//public class test {
//
//
//   public static void main(String[] arg) throws Exception {
//       List<Student> studentList = new ArrayList();
//       Student student = new Studentx(3, "shan");
//
//       studentList.add(student);
//       //studentList.add(student);
//       System.out.println(studentList);
//       addToList(student,studentList);
//       studentList.stream().forEach(System.out::println);
//
//   }
//
//  public static void addToList(Student student,List studentList) throws Exception {
//       if(studentList.stream().filter(std-> studentList.contains(std)).count()>=2)
//       {
//           throw new Exception();
//       }else {
//           studentList.add(student);
//       }
//   }
//}
//
////class Student
////{
////    int age ;
////    String name ;
////
////    public int getAge() {
////        return age;
////    }
////
////    public String getName() {
////        return name;
////    }
////
////    public Student(int age, String name) {
////        this.age = age;
////        this.name = name;
////    }
////
////}
