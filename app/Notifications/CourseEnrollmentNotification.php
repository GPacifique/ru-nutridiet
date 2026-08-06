<?php

namespace App\Notifications;

use App\Models\CourseEnrollment;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class CourseEnrollmentNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public CourseEnrollment $enrollment
    ) {
    }

    /**
     * Notification delivery channels.
     */
    public function via(object $notifiable): array
    {
        return ['database', 'mail'];
    }

    /**
     * Database notification.
     */
    public function toDatabase(object $notifiable): array
    {
        return [
            'type' => 'course_enrollment',
            'title' => 'Course Enrollment Successful',
            'message' => "You have successfully enrolled in {$this->enrollment->course->title}.",
            'course_id' => $this->enrollment->course_id,
            'enrollment_id' => $this->enrollment->id,
            'action_url' => route(
                'courses.show',
                $this->enrollment->course_id
            ),
        ];
    }

    /**
     * Email notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Course Enrollment Successful')
            ->greeting("Hello {$notifiable->name},")
            ->line(
                "You have successfully enrolled in {$this->enrollment->course->title}."
            )
            ->line(
                'You can now access the course materials and continue your learning journey.'
            )
            ->action(
                'View Course',
                route(
                    'courses.show',
                    $this->enrollment->course_id
                )
            )
            ->line('Thank you for learning with us.');
    }
}