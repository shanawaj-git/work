package com.albatha.paymentservice;

import jdk.swing.interop.SwingInterOpUtils;

import java.util.Scanner;
import java.util.List;
import java.util.ArrayList;
import java.util.Comparator;

public class Queue {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        List<Student> studentList  = new ArrayList();
        int numStudents = scanner.nextInt();
        //System.out.println("num--->"+numStudents);
        for (int i = 0; i < numStudents; i++) {
            String action =scanner.next();
            //System.out.println("ACTION --->"+action);
            if(action.equals("ENTER")) {

                String name = scanner.next();
                //System.out.println("name-->"+name);

                Double cgpa = scanner.nextDouble();

                int id = scanner.nextInt();
                //System.out.println("id-->"+id);


                System.out.println(name);

                Student student = new Student(id, name, cgpa);
                studentList.add(student);
                studentList.sort(new Student());
            }else
            {
                if(!studentList.isEmpty())
                studentList.remove(0);
            }
        }
        scanner.close();
        //System.out.println(studentList);
        for (Student s : studentList) {
            System.out.println(s.name );
        }
    }

}

//class Student1 implements Comparator<Student>
//{
//    int id;
//    String name ;
//    double cgpa;
//
//    Student(int id,String name,double cgpa)
//    {
//        this.id=id;
//        this.name=name ;
//        this.cgpa=cgpa;
//
//    }
//    Student()
//    {
//
//    }
//    public int compare(Student a, Student b) {
//        if (a.cgpa == b.cgpa) {
//            if(a.name.equals(b.name))
//            {
//                return a.id - b.id;
//            }
//            return a.name.compareTo(b.name);
//        } else {
//            return Double.compare(b.cgpa,a.cgpa);
//        }
//    }
//
//}

