// resources/js/data/services.js
// Single source of truth for the services list page and the service detail page.
import { ClipboardCheck, Salad, GraduationCap, Sprout, Stethoscope, Baby, Dumbbell, TrendingUp, Users, Leaf } from "lucide-react";

export const services = [
    {
        id: 1, title: "Nutritional Assessment", icon: ClipboardCheck, tone: "sky",
        short: "Understand your nutritional status and identify areas that need attention.",
        description: "A comprehensive assessment of your nutritional status, dietary habits, lifestyle, body measurements, and individual nutrition needs.",
        features: ["Anthropometric assessment", "Dietary assessment", "Lifestyle assessment", "Nutrition risk identification", "Personalized recommendations"],
    },
    {
        id: 2, title: "Personalized Meal Planning", icon: Salad, tone: "emerald",
        short: "Receive a nutrition plan adapted to your individual needs and goals.",
        description: "Personalized meal planning based on your nutritional requirements, lifestyle, health goals, food preferences, and daily routine.",
        features: ["Personalized meal plan", "Portion guidance", "Food selection guidance", "Meal timing recommendations", "Progress-based adjustments"],
    },
    {
        id: 3, title: "Dietary Counseling & Education", icon: GraduationCap, tone: "violet",
        short: "Learn how to make healthier food choices with professional guidance.",
        description: "Practical nutrition education and counseling designed to help individuals understand food choices and develop healthier eating habits.",
        features: ["Nutrition education", "Healthy food choices", "Meal preparation guidance", "Food-label education", "Healthy eating strategies"],
    },
    {
        id: 4, title: "Behavior Change Support", icon: Sprout, tone: "teal",
        short: "Build sustainable habits that support long-term health.",
        description: "Personalized support to help you overcome unhealthy eating patterns and develop sustainable lifestyle and nutrition habits.",
        features: ["Goal setting", "Habit development", "Motivation support", "Progress monitoring", "Lifestyle adjustment"],
    },
    {
        id: 5, title: "Medical Nutrition Therapy", icon: Stethoscope, tone: "rose",
        short: "Nutrition support for individuals with nutrition-related health conditions.",
        description: "Professional nutrition intervention designed to support individuals whose health conditions require specialized dietary management.",
        features: ["Individual nutrition assessment", "Therapeutic nutrition planning", "Diet modification", "Nutrition monitoring", "Follow-up support"],
    },
    {
        id: 6, title: "Pediatric Nutrition", icon: Baby, tone: "amber",
        short: "Support healthy growth and nutrition for children.",
        description: "Nutrition guidance for children and families focused on healthy growth, development, appropriate food choices, and healthy eating habits.",
        features: ["Growth and nutrition assessment", "Child-friendly meal planning", "Healthy eating education", "Nutrient intake guidance", "Family nutrition support"],
    },
    {
        id: 7, title: "Sports Nutrition", icon: Dumbbell, tone: "orange",
        short: "Optimize nutrition for training, performance, recovery, and healthy body composition.",
        description: "Nutrition strategies designed for active individuals and athletes to support energy needs, training, recovery, and performance.",
        features: ["Energy assessment", "Performance nutrition", "Pre-workout nutrition", "Post-workout recovery", "Hydration guidance"],
    },
    {
        id: 8, title: "Follow-up & Support", icon: TrendingUp, tone: "sky",
        short: "Stay accountable and receive ongoing nutrition guidance.",
        description: "Regular follow-up sessions to evaluate progress, identify challenges, adjust recommendations, and maintain healthy lifestyle changes.",
        features: ["Progress monitoring", "Plan adjustments", "Nutrition review", "Goal tracking", "Continuous support"],
    },
    {
        id: 9, title: "Group Workshops & Seminars", icon: Users, tone: "violet",
        short: "Professional nutrition education for organizations, communities, and groups.",
        description: "Interactive nutrition and wellness workshops designed for organizations, schools, companies, communities, and other groups.",
        features: ["Nutrition presentations", "Interactive education", "Healthy lifestyle training", "Community education", "Corporate wellness sessions"],
    },
    {
        id: 10, title: "Lifestyle Coaching", icon: Leaf, tone: "emerald",
        short: "Develop a healthier lifestyle through practical and sustainable guidance.",
        description: "Holistic lifestyle coaching that supports nutrition, physical activity, rest, stress management, relationships, mindset, and healthy daily routines.",
        features: ["Nutrition guidance", "Physical activity support", "Rest and relaxation", "Stress management", "Healthy lifestyle habits"],
    },
];