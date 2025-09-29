"use client";

import { Fragment, useState } from "react";
import { motion } from "framer-motion";
import { ITEM_VARIANT_Y } from "@/constants/motions";

type ContactFormProps = {
  title: string;
  paragraph: string;
  form: {
    [key: string]: string;
    fname: string;
    lname: string;
    phone: string;
    email: string;
    message: string;
  };
};

type FormValues = ContactFormProps["form"];
type FormErrors = Partial<Record<keyof FormValues, string>>;

const chunkedForm = [["fname", "lname"], ["phone", "email"], ["message"]];
const MESSAGE_LIMIT = 500;

const ContactForm = ({ title, paragraph, form }: ContactFormProps) => {
  const [values, setValues] = useState<FormValues>({
    fname: "",
    lname: "",
    phone: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "message") {
      const trimmed = value.slice(0, MESSAGE_LIMIT);
      setValues((prev) => ({ ...prev, [name]: trimmed }));
    } else {
      setValues((prev) => ({ ...prev, [name]: value }));
    }

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = (vals: FormValues): FormErrors => {
    const newErrors: FormErrors = {};

    if (!vals.fname.trim()) newErrors.fname = "First name is required";
    if (!vals.lname.trim()) newErrors.lname = "Last name is required";

    if (!vals.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[0-9]{8,15}$/.test(vals.phone)) {
      newErrors.phone = "Invalid phone number format";
    }

    if (!vals.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(vals.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!vals.message.trim()) {
      newErrors.message = "Message is required";
    } else if (vals.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      setSubmitting(true);

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Message sent successfully!");
        setValues({
          fname: "",
          lname: "",
          phone: "",
          email: "",
          message: "",
        });
      } else {
        alert(data.error || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="section__contact">
      <div className="container">
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={ITEM_VARIANT_Y({ initDelay: 0.2 })}
        >
          {title}
        </motion.h2>

        <motion.p
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={ITEM_VARIANT_Y({ initDelay: 0.4 })}
        >
          {paragraph}
        </motion.p>

        <form onSubmit={handleSubmit} noValidate>
          {chunkedForm.map((arr, idx) => (
            <div key={idx} className="form-row">
              {arr.map((key, i) => {
                return (
                  <div key={i} className="form-group">
                    <motion.div
                      className={`input-wrapper blue-card ${
                        errors[key] ? "has-error" : ""
                      }`}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      variants={ITEM_VARIANT_Y({
                        index: Object.keys(form).indexOf(key),
                        initDelay: 0.6,
                        delay: 0.2,
                        y: 50,
                      })}
                    >
                      {key !== "message" ? (
                        <input
                          type={key === "email" ? "email" : "text"}
                          name={key}
                          placeholder={form[key]}
                          value={values[key]}
                          onChange={handleChange}
                          className="form-control"
                        />
                      ) : (
                        <Fragment>
                          <textarea
                            name={key}
                            placeholder={form[key]}
                            value={values[key]}
                            onChange={handleChange}
                            className="form-control"
                          />
                          <div className="char-counter">
                            {MESSAGE_LIMIT - values.message.length} characters
                            left
                          </div>
                        </Fragment>
                      )}
                    </motion.div>
                    {errors[key] && (
                      <span className="error-message">{errors[key]}</span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}

          <motion.button
            type="submit"
            className="btn outline accent fit"
            disabled={submitting}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={ITEM_VARIANT_Y({
              index: 5,
              initDelay: 0.6,
              delay: 0.2,
              y: 50,
            })}
          >
            {submitting ? "Sending..." : "Send Message"}
          </motion.button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
