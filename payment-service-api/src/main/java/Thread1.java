import static java.lang.Thread.sleep;

public class Thread1 {

    public static void main(String[] args) {
       Employee emp= new Employee();
        Thread t1 = new Thread(emp);
        Thread t2 = new Thread(emp);

        t1.start();
        t2.start();

    }
}


class Student extends Thread {
    int age;

    synchronized public void run()   {
        for (int i = 0; i <= 20; i++) {
            try {
                sleep(1);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
            System.out.println(i);
        }
    }
}


class Employee implements Runnable
{
   synchronized public void run()
    {
        for (int i = 0; i <= 20; i++) {
            try {
                sleep(1);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
            System.out.println(i);
        }
    }

}
