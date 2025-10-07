import { Request, Response } from "express";

export const rulebasedController = async (req: Request, res: Response) => {
  const { message } = req.body;
  const user_input = message.toLowerCase();

  // Exit condition
  if (user_input.includes("bye") || user_input.includes("exit")) {
    return res.json({
      reply: "Goodbye! 👋 Have a great day at Murang’a University!",
    });
  }

  // Rule-based responses
  else if (user_input.includes("course") || user_input.includes("program")) {
    return res.json({
      reply:
        "Murang’a University offers programs in Computer Science, IT, Engineering, Business, and Education.",
    });
  } else if (user_input.includes("location") || user_input.includes("where")) {
    return res.json({
      reply:
        "Murang’a University is located about 1.5 km from Murang’a Town, along the Murang’a–Sagana road.",
    });
  } else if (user_input.includes("admission") || user_input.includes("apply")) {
    return res.json({
      reply:
        "Admissions are handled through KUCCPS or direct application via the MUT website: www.mut.ac.ke/admissions",
    });
  } else if (user_input.includes("fees") || user_input.includes("cost")) {
    return res.json({
      reply:
        "Fees vary by program, but undergraduate fees start at around Ksh 60,000 per semester.",
    });
  } else if (
    user_input.includes("hostel") ||
    user_input.includes("accommodation")
  ) {
    return res.json({
      reply:
        "The university offers on-campus hostels and supports nearby private accommodations for students.",
    });
  } else if (user_input.includes("contacts") || user_input.includes("email")) {
    return res.json({
      reply:
        "You can contact MUT via email at info@mut.ac.ke or call +254 712 345 678.",
    });
  } else if (user_input.includes("vision")) {
    return res.json({
      reply:
        "The vision of MUT is 'To be a leading University in Technological Innovation for Prosperity.'",
    });
  } else if (user_input.includes("mission")) {
    return res.json({
      reply:
        "The mission of MUT is 'To advance knowledge and technological transfer through teaching, training, research, and innovation for sustainable development.'",
    });
  } else if( user_input.includes("duration") || user_input.includes("how long") || user_input.includes("time")){
    return res.json({
      reply: 
      "Degree courses at MUT take 4 years to complite with exception in Engineering science wich take 5 years."
    })
  }
  
  else {
    return res.json({
      reply:
        "Sorry, I’m not sure about that. Please ask about courses, fees, admissions, or location.",
    });
  }
};
