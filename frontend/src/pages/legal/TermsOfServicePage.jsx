/**
 * Terms of Service Page for BookBee
 */
import React from 'react';
import Card from '../../components/common/Card';

const TermsOfServicePage = () => {
  const lastUpdated = "January 15, 2025";

  const sections = [
    {
      id: "acceptance-terms",
      title: "1. Acceptance of Terms",
      content: [
        "By accessing or using BookBee's services, you agree to be bound by these Terms of Service.",
        "If you do not agree to these terms, please do not use our platform.",
        "We may modify these terms at any time, and your continued use constitutes acceptance of changes.",
        "You must be at least 18 years old to use BookBee services."
      ]
    },
    {
      id: "service-description",
      title: "2. Service Description",
      content: [
        "BookBee is a platform that connects travelers with vehicle owners for ride-sharing services.",
        "We facilitate both shared seat bookings and private cab reservations.",
        "BookBee is a technology platform and does not provide transportation services directly.",
        "All rides are provided by independent hosts using their own vehicles."
      ]
    },
    {
      id: "user-accounts",
      title: "3. User Accounts and Registration",
      content: [
        "You must create an account to use our services and provide accurate information.",
        "You are responsible for maintaining the confidentiality of your account credentials.",
        "You must notify us immediately of any unauthorized use of your account.",
        "We reserve the right to suspend or terminate accounts that violate these terms."
      ]
    },
    {
      id: "user-responsibilities",
      title: "4. User Responsibilities",
      content: [
        {
          subtitle: "All Users:",
          items: [
            "Provide accurate and up-to-date information",
            "Treat other users with respect and courtesy",
            "Comply with all applicable laws and regulations",
            "Use the platform only for its intended purpose"
          ]
        },
        {
          subtitle: "Travelers:",
          items: [
            "Arrive at pickup locations on time",
            "Pay all fees promptly and in full",
            "Follow host's reasonable vehicle rules",
            "Report any issues or concerns immediately"
          ]
        },
        {
          subtitle: "Hosts:",
          items: [
            "Maintain valid driving license and vehicle registration",
            "Ensure vehicle is safe and roadworthy",
            "Provide accurate trip information",
            "Honor confirmed bookings unless emergency circumstances"
          ]
        }
      ]
    },
    {
      id: "prohibited-activities",
      title: "5. Prohibited Activities",
      content: [
        "Creating fake or multiple accounts",
        "Harassment, discrimination, or inappropriate behavior",
        "Posting false or misleading information",
        "Using the platform for illegal activities",
        "Circumventing our fees or payment systems",
        "Interfering with platform security or functionality",
        "Violating intellectual property rights",
        "Spamming or sending unsolicited communications"
      ]
    },
    {
      id: "booking-policies",
      title: "6. Booking and Payment Policies",
      content: [
        {
          subtitle: "Booking Process:",
          items: [
            "All bookings are subject to host approval",
            "Confirmed bookings create binding obligations",
            "Cancellation policies apply as specified in each listing",
            "Payment is required at time of booking confirmation"
          ]
        },
        {
          subtitle: "Payment Terms:",
          items: [
            "All payments are processed through our secure payment system",
            "BookBee charges service fees as disclosed during booking",
            "Refunds are subject to our cancellation policy",
            "Hosts receive payments after trip completion minus applicable fees"
          ]
        }
      ]
    },
    {
      id: "cancellation-policy",
      title: "7. Cancellation and Refund Policy",
      content: [
        {
          subtitle: "Traveler Cancellations:",
          items: [
            "Free cancellation up to 24 hours before trip",
            "50% refund for cancellations 12-24 hours before trip",
            "25% refund for cancellations 2-12 hours before trip",
            "No refund for cancellations less than 2 hours before trip"
          ]
        },
        {
          subtitle: "Host Cancellations:",
          items: [
            "Hosts may cancel for legitimate safety or emergency reasons",
            "Frequent cancellations may result in account suspension",
            "Travelers receive full refund for host-initiated cancellations",
            "Alternative arrangements will be offered when possible"
          ]
        }
      ]
    },
    {
      id: "safety-security",
      title: "8. Safety and Security",
      content: [
        "All users must verify their identity through our verification process",
        "Report any safety concerns immediately through the app",
        "Emergency contact information should be kept updated",
        "We reserve the right to conduct background checks on hosts",
        "Users are responsible for their own safety during trips",
        "BookBee provides safety features but does not guarantee user safety"
      ]
    },
    {
      id: "intellectual-property",
      title: "9. Intellectual Property Rights",
      content: [
        "BookBee owns all rights to the platform, including trademarks and copyrights",
        "Users grant us license to use content they post on the platform",
        "Users may not copy, modify, or distribute our proprietary technology",
        "Respect other users' intellectual property rights",
        "Report any copyright infringement to us immediately"
      ]
    },
    {
      id: "limitation-liability",
      title: "10. Limitation of Liability",
      content: [
        "BookBee is not liable for actions or omissions of hosts or travelers",
        "We do not guarantee the safety, quality, or legality of rides",
        "Our liability is limited to the amount paid for services",
        "We are not responsible for indirect, incidental, or consequential damages",
        "Some jurisdictions may not allow limitation of liability"
      ]
    },
    {
      id: "dispute-resolution",
      title: "11. Dispute Resolution",
      content: [
        {
          subtitle: "Resolution Process:",
          items: [
            "Contact our support team first to resolve disputes",
            "We will mediate disputes between users in good faith",
            "Formal complaints must be submitted within 30 days",
            "Legal disputes will be governed by Indian law"
          ]
        },
        {
          subtitle: "Jurisdiction:",
          items: [
            "These terms are governed by the laws of India",
            "Disputes will be resolved in courts of Varanasi, Uttar Pradesh",
            "Users consent to jurisdiction of Indian courts",
            "International users may have additional rights under local law"
          ]
        }
      ]
    },
    {
      id: "termination",
      title: "12. Termination",
      content: [
        "Either party may terminate the agreement at any time",
        "We may suspend or terminate accounts for terms violations",
        "Termination does not relieve obligations for completed transactions",
        "Data retention policies continue to apply after termination",
        "Some provisions survive termination of the agreement"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
            <p className="text-xl text-gray-600 mb-2">
              Rules and guidelines for using BookBee
            </p>
            <p className="text-sm text-gray-500">
              Last Updated: {lastUpdated}
            </p>
          </div>

          {/* Introduction */}
          <Card className="mb-8">
            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to BookBee</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                These Terms of Service ("Terms") govern your use of BookBee's ride-sharing platform and services. 
                By using BookBee, you agree to comply with and be bound by these terms.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                BookBee connects travelers with vehicle owners to facilitate shared transportation. 
                These terms establish the rights and responsibilities of all platform users.
              </p>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 text-sm">
                  <strong>Important:</strong> Please read these terms carefully before using our services. 
                  If you do not agree with any part of these terms, you should not use BookBee.
                </p>
              </div>
            </div>
          </Card>

          {/* Table of Contents */}
          <Card className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Table of Contents</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="text-yellow-600 hover:text-yellow-700 text-sm py-1 transition-colors"
                >
                  {section.title}
                </a>
              ))}
            </div>
          </Card>

          {/* Terms Sections */}
          <div className="space-y-8">
            {sections.map((section) => (
              <Card key={section.id} id={section.id}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{section.title}</h2>
                
                <div className="space-y-6">
                  {section.content.map((item, index) => {
                    if (typeof item === 'string') {
                      return (
                        <div key={index} className="flex items-start">
                          <span className="flex-shrink-0 w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3"></span>
                          <span className="text-gray-700 leading-relaxed">{item}</span>
                        </div>
                      );
                    } else if (item.subtitle) {
                      return (
                        <div key={index}>
                          <h3 className="text-lg font-semibold text-gray-800 mb-3">
                            {item.subtitle}
                          </h3>
                          <ul className="space-y-2">
                            {item.items.map((subItem, subIndex) => (
                              <li key={subIndex} className="flex items-start">
                                <span className="flex-shrink-0 w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3"></span>
                                <span className="text-gray-700 leading-relaxed">{subItem}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </Card>
            ))}
          </div>

          {/* Contact and Support */}
          <Card className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">13. Contact and Support</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Need Help?</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  If you have questions about these Terms of Service or need support with our platform:
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>Email:</strong> support@bookbee.com</p>
                  <p><strong>Phone:</strong> +91 95559 09575</p>
                  <p><strong>Hours:</strong> 24/7 Customer Support</p>
                  <p><strong>Emergency:</strong> Contact local authorities</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Legal Notice</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  These terms constitute a legally binding agreement between you and BookBee Technologies Pvt. Ltd.
                </p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-yellow-800 text-sm">
                    <strong>Note:</strong> If any provision of these terms is found unenforceable, 
                    the remaining provisions will continue in full force and effect.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Footer */}
          <div className="text-center mt-12 py-8 border-t border-gray-200">
            <p className="text-gray-500 text-sm mb-2">
              © 2025 BookBee Technologies Pvt. Ltd. All rights reserved.
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-500">
              <a href="/privacy-policy" className="hover:text-yellow-600 transition-colors">Privacy Policy</a>
              <span>•</span>
              <a href="/terms-of-service" className="hover:text-yellow-600 transition-colors">Terms of Service</a>
              <span>•</span>
              <a href="/contact" className="hover:text-yellow-600 transition-colors">Contact Us</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;