"use client";
import Image from 'next/image';

export default function About() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-[#58595b] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              About Your Instructor
            </h1>
          </div>
        </div>
      </div>

      {/* Instructor Profile Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start gap-12">
            <div className="w-64 h-64 relative rounded-full overflow-hidden flex-shrink-0 mx-auto md:mx-0">
              <Image
                src="/images/jake_speaking.jpg"
                alt="Jake Blankenship"
                width={256}
                height={256}
                unoptimized
                className="object-cover w-full h-full"
                priority
              />
            </div>
            <div className="flex-1">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-3xl font-bold text-[#58595b] mb-6">Meet Jake Blankenship</h2>
                <p className="text-xl text-gray-600 mb-6">
                  Welcome to JakesWorld! I'm excited to help you master regression modeling through 
                  interactive learning experiences and practical applications.
                </p>
                <h3 className="text-2xl font-semibold text-[#58595b] mb-4">My Mission</h3>
                <p className="text-gray-600 mb-6">
                  At JakesWorld, my goal is to revolutionize how students learn regression modeling 
                  by infusing humor and fun into every lesson. I believe that learning complex 
                  statistical concepts doesn't have to be dry or intimidating. Through a blend of 
                  dad jokes, engaging visualizations, and interactive content, I'm here to make 
                  your learning experience not just educational, but genuinely enjoyable. By combining 
                  lighthearted humor with hands-on applications, I aim to transform those challenging 
                  statistical concepts into memorable "aha!" moments. Let's make learning regression 
                  modeling something you actually look forward to!
                </p>
                <h3 className="text-2xl font-semibold text-[#58595b] mb-4">Education</h3>
                <ul className="list-disc pl-6 mb-6 text-gray-600">
                  <li>Pursuing Bachelor's of Science in Business Analytics, University of Tennessee</li>
                </ul>
                <h3 className="text-2xl font-semibold text-[#58595b] mb-4">Contact Information</h3>
                <div className="text-gray-600 mb-6">
                  <p className="mb-2">
                    <span className="font-semibold">Email:</span>{" "}
                    <a href="mailto:jblank24@vols.utk.edu" className="text-[#ff8200] hover:underline">
                      jblank24@vols.utk.edu
                    </a>
                  </p>
                  <p>
                    <span className="font-semibold">Phone:</span>{" "}
                    <a href="tel:865-207-8295" className="text-[#ff8200] hover:underline">
                      (865) 207-8295
                    </a>
                  </p>
                </div>
                <h3 className="text-2xl font-semibold text-[#58595b] mb-4">Certifications</h3>
                <ul className="list-disc pl-6 mb-6 text-gray-600">
                  <li>Microsoft Fabric Analytics Engineer Associate</li>
                  <li>Microsoft Azure Fundamentals</li>
                  <li>Microsoft Power BI Data Analyst Associate</li>
                </ul>
                <h3 className="text-2xl font-semibold text-[#58595b] mb-4">Where to Find Me</h3>
                <p className="text-gray-600 mb-6">
                  You can find me in the Analytics Department on the second floor of Stokely 
                  Management Center. Don't hesitate to stop by and say hi - whether you want to 
                  chat about statistics, need help with regression, or just want to talk about your day!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-[#f0f0f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[#58595b] mb-6">Our Mission</h2>
            <p className="text-xl text-gray-600">
              To empower students with the knowledge and skills needed to excel in regression modeling 
              through engaging, interactive learning experiences that bridge the gap between theory 
              and practical application.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
} 