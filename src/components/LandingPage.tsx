"use client"

import type React from "react"
import type { AnimationControls } from "framer-motion"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Activity, BarChart2, Shield, Zap, ArrowRight, Clock, Settings, Cpu } from "lucide-react"

const LandingPage: React.FC = () => {
  // Animation for scrolling sections
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  // Stats counter animation
  const countAnimation = (value: number) => {
    return {
      hidden: { count: 0 },
      visible: {
        count: value,
        transition: { duration: 2, ease: "easeOut" },
      },
    }
  }

  // Staggered children animation
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  // For triggering animations when scrolled into view
  const useScrollAnimation = (): [React.RefObject<HTMLElement>, AnimationControls] => {
    const controls = useAnimation()
    const ref = useRef<HTMLElement>(null) as React.RefObject<HTMLElement>
    const [inViewRef, inView] = useInView({
      threshold: 0.2,
      triggerOnce: true,
    })

    useEffect(() => {
      inViewRef(ref.current)
    }, [inViewRef])

    useEffect(() => {
      if (inView) {
        controls.start("visible")
      }
    }, [controls, inView])

    return [ref, controls]
  }

  const [featuresRef, featuresControls] = useScrollAnimation()
  const [statsRef, statsControls] = useScrollAnimation()
  const [testimonialsRef, testimonialsControls] = useScrollAnimation()
  const [ctaRef, ctaControls] = useScrollAnimation()

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 overflow-hidden">
      {/* Hero Section with Animated Background */}
      <header className="relative overflow-hidden bg-gradient-to-r from-blue-700 to-indigo-800 dark:from-blue-900 dark:to-indigo-950">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/10"
              style={{
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * -100 - 50],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
                delay: Math.random() * 10,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-32 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6 inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
            >
              <span className="flex h-2 w-2 rounded-full bg-green-400 mr-2 animate-pulse"></span>
              <span className="text-sm font-medium text-white">Industry-leading monitoring solution</span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Intelligent Industrial
              <span className="relative">
                <span className="relative z-10"> Monitoring</span>
                <motion.span
                  className="absolute bottom-1 left-0 w-full h-3 bg-blue-400/30 rounded-lg -z-0"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                ></motion.span>
              </span>
            </motion.h1>

            <motion.p
              className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Real-time equipment monitoring with advanced analytics. Prevent downtime, optimize performance, and make
              data-driven decisions with SystemSync.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/dashboard"
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all duration-300 md:text-lg"
              >
                View Live Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>

              <Link
                to="/demo"
                className="inline-flex items-center px-8 py-3 border border-white/30 text-base font-medium rounded-md text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 md:text-lg"
              >
                Watch Demo
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                  }}
                  className="ml-2"
                >
                  <Zap className="h-5 w-5" />
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>

          {/* Floating dashboard preview */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-12 relative mx-auto max-w-4xl"
          >
            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-white/20 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/80 to-indigo-900/80 z-10"></div>
              <img
                src="/placeholder.svg?height=600&width=1200"
                alt="Dashboard Preview"
                className="w-full h-auto opacity-80"
              />
              <div className="absolute top-0 left-0 right-0 h-8 bg-gray-900/50 flex items-center px-4 z-20">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </div>

              {/* Animated elements on the dashboard */}
              <motion.div
                className="absolute top-1/4 left-1/4 w-16 h-16 bg-green-500/20 rounded-full z-20"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.6, 0.8, 0.6],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
              />
              <motion.div
                className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-blue-500/20 rounded-full z-20"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.6, 0.8, 0.6],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  delay: 1,
                }}
              />
            </div>
          </motion.div>
        </div>
      </header>

      {/* Stats Section */}
      <motion.section
        ref={statsRef}
        animate={statsControls as AnimationControls}
        initial="hidden"
        variants={fadeInUp}
        className="py-16 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div variants={fadeInUp} className="p-6">
              <motion.span
                className="text-4xl font-bold text-blue-600 dark:text-blue-400 block mb-2"
                variants={countAnimation(99.9)}
                initial="hidden"
                animate={statsControls as AnimationControls}
              >
                {/* {(props) => <>{props.count.toFixed(1)}%</>} */}
              </motion.span>
              <span className="text-gray-600 dark:text-gray-300">Uptime</span>
            </motion.div>

            <motion.div variants={fadeInUp} className="p-6">
              <motion.span
                className="text-4xl font-bold text-blue-600 dark:text-blue-400 block mb-2"
                variants={countAnimation(85)}
                initial="hidden"
                animate={statsControls}
              >
                {/* {(props) => <>{Math.round(props.count)}%</>} */}
              </motion.span>
              <span className="text-gray-600 dark:text-gray-300">Efficiency Increase</span>
            </motion.div>

            <motion.div variants={fadeInUp} className="p-6">
              <motion.span
                className="text-4xl font-bold text-blue-600 dark:text-blue-400 block mb-2"
                variants={countAnimation(500)}
                initial="hidden"
                animate={statsControls}
              >
                {/* {(props) => <>{Math.round(props.count)}+</>} */}
              </motion.span>
              <span className="text-gray-600 dark:text-gray-300">Clients</span>
            </motion.div>

            <motion.div variants={fadeInUp} className="p-6">
              <motion.span
                className="text-4xl font-bold text-blue-600 dark:text-blue-400 block mb-2"
                variants={countAnimation(10000)}
                initial="hidden"
                animate={statsControls}
              >
                {/* {(props) => <>{Math.round(props.count).toLocaleString()}+</>} */}
              </motion.span>
              <span className="text-gray-600 dark:text-gray-300">Devices Monitored</span>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        ref={featuresRef}
        animate={featuresControls}
        initial="hidden"
        variants={staggerContainer}
        className="py-24 bg-white dark:bg-gray-900"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeInUp} className="text-center mb-20">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-4 inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30"
            >
              <span className="text-sm font-medium text-blue-800 dark:text-blue-300">Powerful Features</span>
            </motion.div>

            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Comprehensive Monitoring Solution</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Everything you need to keep your equipment running at peak performance
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Real-time Monitoring */}
            <motion.div
              variants={fadeInUp}
              whileHover={{
                y: -10,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              }}
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 transition-all duration-300"
            >
              <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-6">
                <Activity className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Real-time Monitoring</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Monitor voltage, RPM, temperature, humidity, and vibration in real-time with instant alerts.
              </p>
              <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium">
                <span>Learn more</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </motion.div>

            {/* Predictive Analytics */}
            <motion.div
              variants={fadeInUp}
              whileHover={{
                y: -10,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              }}
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 transition-all duration-300"
            >
              <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-6">
                <BarChart2 className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Predictive Analytics</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Advanced analytics to predict maintenance needs and prevent equipment failures before they occur.
              </p>
              <div className="flex items-center text-green-600 dark:text-green-400 font-medium">
                <span>Learn more</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </motion.div>

            {/* Smart Alerts */}
            <motion.div
              variants={fadeInUp}
              whileHover={{
                y: -10,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              }}
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 transition-all duration-300"
            >
              <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Smart Alerts</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Customizable alerts and notifications when equipment parameters exceed thresholds or anomalies are
                detected.
              </p>
              <div className="flex items-center text-purple-600 dark:text-purple-400 font-medium">
                <span>Learn more</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </motion.div>

            {/* Remote Management */}
            <motion.div
              variants={fadeInUp}
              whileHover={{
                y: -10,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              }}
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 transition-all duration-300"
            >
              <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-6">
                <Settings className="h-8 w-8 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Remote Management</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Control and manage your equipment remotely from anywhere in the world with secure access controls.
              </p>
              <div className="flex items-center text-red-600 dark:text-red-400 font-medium">
                <span>Learn more</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </motion.div>

            {/* Performance Optimization */}
            <motion.div
              variants={fadeInUp}
              whileHover={{
                y: -10,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              }}
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 transition-all duration-300"
            >
              <div className="bg-amber-100 dark:bg-amber-900/30 p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-6">
                <Cpu className="h-8 w-8 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Performance Optimization</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                AI-powered recommendations to optimize equipment settings for maximum efficiency and output.
              </p>
              <div className="flex items-center text-amber-600 dark:text-amber-400 font-medium">
                <span>Learn more</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </motion.div>

            {/* Maintenance Scheduling */}
            <motion.div
              variants={fadeInUp}
              whileHover={{
                y: -10,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              }}
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 transition-all duration-300"
            >
              <div className="bg-teal-100 dark:bg-teal-900/30 p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-6">
                <Clock className="h-8 w-8 text-teal-600 dark:text-teal-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Maintenance Scheduling</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Automated maintenance scheduling based on usage patterns and predictive analytics.
              </p>
              <div className="flex items-center text-teal-600 dark:text-teal-400 font-medium">
                <span>Learn more</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        ref={testimonialsRef}
        animate={testimonialsControls}
        initial="hidden"
        variants={fadeInUp}
        className="py-24 bg-gray-50 dark:bg-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-4 inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30"
            >
              <span className="text-sm font-medium text-blue-800 dark:text-blue-300">Trusted by Industry Leaders</span>
            </motion.div>

            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Hear from the companies that have transformed their operations with our monitoring solution
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Operations Manager, TechManufacturing Inc.",
                quote:
                  "SystemSync has reduced our downtime by 78% and helped us optimize our maintenance schedule. The ROI has been incredible.",
                image: "/placeholder.svg?height=100&width=100",
              },
              {
                name: "Michael Chen",
                role: "CTO, Global Industries",
                quote:
                  "The predictive analytics have been a game-changer. We can now anticipate equipment failures before they happen and take proactive measures.",
                image: "/placeholder.svg?height=100&width=100",
              },
              {
                name: "Emily Rodriguez",
                role: "Plant Manager, EcoSolutions",
                quote:
                  "The real-time monitoring capabilities have given us unprecedented visibility into our operations. We can make data-driven decisions faster than ever.",
                image: "/placeholder.svg?height=100&width=100",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-600"
              >
                <div className="flex items-center mb-6">
                  <div className="mr-4">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-200 italic">"{testimonial.quote}"</p>
                <div className="mt-6 flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        ref={ctaRef}
        animate={ctaControls as AnimationControls}
        initial="hidden"
        variants={fadeInUp}
        className="py-24 bg-white dark:bg-gray-900"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            className="relative bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#grid)" />
              </svg>
            </div>

            <div className="relative px-6 py-16 md:p-16 text-center md:text-left md:flex md:items-center md:justify-between">
              <div className="max-w-2xl">
                <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Ready to optimize your equipment performance?
                </motion.h2>
                <motion.p variants={fadeInUp} className="text-xl text-blue-100 mb-8 md:mb-0">
                  Start monitoring your industrial equipment in real-time today and see the difference.
                </motion.p>
              </div>
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-xl text-blue-700 bg-white hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all duration-300 md:text-lg"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 border border-white text-base font-medium rounded-xl text-white hover:bg-white/10 transition-all duration-300 md:text-lg"
                >
                  Contact Sales
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div>
              <h3 className="text-xl font-bold mb-4">SystemSync</h3>
              <p className="text-gray-400 mb-4">Intelligent industrial monitoring solutions for the modern factory.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.48 2 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Solutions</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Real-time Monitoring
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Predictive Analytics
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Smart Alerts
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Remote Management
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Performance Optimization
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Press
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Partners
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
              <p className="text-gray-400 mb-4">Stay updated with our latest features and releases.</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 w-full rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-md transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2025 SystemSync. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
function useRef<T>(initialValue: T | null): React.RefObject<T> {
  const ref = { current: initialValue };
  return ref;
}

