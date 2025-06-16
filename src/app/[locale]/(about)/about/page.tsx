import React from 'react';
import Image from 'next/image';
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';

// Card component for services
interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon }) => {
  return (
    <Card className="hover:shadow-xl transition-shadow">
      <CardHeader className="flex flex-row items-center gap-4">
      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
        <i className={`${icon} text-primary-600 text-2xl`}></i>
      </div>
      <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
      <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
};

// Team member card component
interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  bio: string;
}

const TeamMemberCard: React.FC<TeamMemberProps> = ({ name, role, image, bio }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-64 w-full">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
        <p className="text-primary-600 mb-4">{role}</p>
        <p className="text-gray-600">{bio}</p>
      </div>
    </div>
  );
};

// Mission statement section
const MissionStatement = () => {
  return (
    <section className="bg-primary py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-black text-center mb-8">Our Mission</h2>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg text-gray-700 mb-6">
            At Riah Market, we are committed to revolutionizing the digital marketplace
            by creating a seamless connection between buyers and sellers. Our platform
            empowers businesses of all sizes while providing consumers with an
            unmatched shopping experience.
          </p>
          <p className="text-lg text-gray-700">
            We believe in sustainable commerce, transparency, and building lasting
            relationships between merchants and customers.
          </p>
        </div>
      </div>
    </section>
  );
};

// Services section
const ServicesSection = () => {
  const services = [
    {
      title: "Digital Marketplace",
      description: "A comprehensive platform connecting sellers with potential buyers, featuring advanced search and filtering capabilities.",
      icon: "shopping-cart"
    },
    {
      title: "Secure Transactions",
      description: "State-of-the-art payment processing and security measures to ensure safe and reliable transactions.",
      icon: "shield-check"
    },
    {
      title: "Seller Tools",
      description: "Powerful analytics, inventory management, and marketing tools to help sellers grow their business.",
      icon: "chart-bar"
    },
    {
      title: "Customer Support",
      description: "24/7 customer support and dispute resolution services to ensure satisfaction for all users.",
      icon: "support"
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Team section
const TeamSection = () => {
  const teamMembers = [
    {
      name: "John Smith",
      role: "CEO & Founder",
      image: "/asset/profile/profile_2.png",
      bio: "With over 15 years of experience in e-commerce, John leads our vision for the future of digital marketplaces."
    },
    {
      name: "Sarah Johnson",
      role: "Head of Operations",
      image: "/asset/profile/profile_4.jpg",
      bio: "Sarah ensures smooth platform operations and oversees customer satisfaction initiatives."
    },
    {
      name: "Michael Chen",
      role: "Chief Technology Officer",
      image: "/asset/profile/profile_1.png",
      bio: "Michael drives our technical innovation and leads our engineering team in building scalable solutions."
    }
  ];

  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={index} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Main About page component
const PageAbout = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-primary-600">
        <div className="absolute inset-0 bg-muted opacity-50"></div>
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center text-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              About Riah Market
            </h1>
            <p className="text-xl text-white max-w-2xl">
              Empowering commerce through innovation and connection
            </p>
          </div>
        </div>
      </section>

      {/* Main content sections */}
      <MissionStatement />
      <ServicesSection />
      <TeamSection />

      {/* Statistics Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-4xl font-bold mb-2">1M+</h3>
              <p>Active Users</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold mb-2">50K+</h3>
              <p>Sellers</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold mb-2">5M+</h3>
              <p>Products Listed</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold mb-2">100+</h3>
              <p>Countries Served</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PageAbout;