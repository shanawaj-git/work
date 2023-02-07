package com.albatha.paymentservice;

import java.util.Scanner;
import java.util.List;
import java.util.ArrayList;
import java.util.Comparator;

public class Sorting {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        List<Student> studentList  = new ArrayList();
        int numStudents = scanner.nextInt();
        for (int i = 0; i < numStudents; i++) {
            int id = scanner.nextInt();
            String name =scanner.next();
            Double cgpa=scanner.nextDouble();

//            System.out.println(studentDetails);
//            String[] studentArray = studentDetails.split(" ");
            Student student = new Student(id, name, cgpa);
            studentList.add(student);
        }
        scanner.close();

        studentList.sort(new Student());

        for (Student s : studentList) {
            System.out.println("Name: " + s.name + ", Marks: " + s.cgpa+ ", Roll Number: " + s.id);
        }
    }

}

 class Student implements Comparator<Student>
    {
        int id;
        String name ;
        double cgpa;

        Student(int id,String name,double cgpa)
        {
            this.id=id;
            this.name=name ;
            this.cgpa=cgpa;

        }
        Student()
        {

        }
        public int compare(Student a, Student b) {
            if (a.cgpa == b.cgpa) {
                if(a.name.equals(b.name))
                {
                    return a.id - b.id;
                }
                return a.name.compareTo(b.name);
            } else {
                return Double.compare(b.cgpa,a.cgpa);
            }
        }

    }

