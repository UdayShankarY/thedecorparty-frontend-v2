import type { ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useBookingContext } from "../hooks/useBookingContext";

function FieldLabel({ htmlFor, children, required }: { htmlFor: string; children: ReactNode; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-semibold text-slate-800">
      {children}
      {required && <span className="text-rose-500"> *</span>}
    </label>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-xs text-rose-600">{message}</p>;
}

const selectClass =
  "flex h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm shadow-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100";

export function BookingDetailsForm() {
  const { details, fieldErrors, formError, timeSlots, setupTimeSlots, updateField } =
    useBookingContext();

  const today = new Date().toISOString().split("T")[0];

  return (
    <form
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <FieldLabel htmlFor="bookerName" required>
            Booker Name
          </FieldLabel>
          <Input
            id="bookerName"
            value={details.bookerName}
            onChange={(e) => updateField("bookerName", e.target.value)}
            placeholder="Full name"
          />
          <FieldError message={fieldErrors.bookerName} />
        </div>

        <div className="space-y-2">
          <FieldLabel htmlFor="mobile" required>
            Mobile Number
          </FieldLabel>
          <Input
            id="mobile"
            type="tel"
            inputMode="numeric"
            maxLength={10}
            value={details.mobile}
            onChange={(e) => updateField("mobile", e.target.value.replace(/\D/g, ""))}
            placeholder="10-digit mobile"
          />
          <FieldError message={fieldErrors.mobile} />
        </div>

        <div className="space-y-2">
          <FieldLabel htmlFor="alternateMobile">Alternate Mobile Number</FieldLabel>
          <Input
            id="alternateMobile"
            type="tel"
            inputMode="numeric"
            maxLength={10}
            value={details.alternateMobile}
            onChange={(e) => updateField("alternateMobile", e.target.value.replace(/\D/g, ""))}
            placeholder="Optional"
          />
          <FieldError message={fieldErrors.alternateMobile} />
        </div>

        <div className="space-y-2">
          <FieldLabel htmlFor="eventDate" required>
            Event Date
          </FieldLabel>
          <Input
            id="eventDate"
            type="date"
            min={today}
            value={details.eventDate}
            onChange={(e) => updateField("eventDate", e.target.value)}
          />
          <FieldError message={fieldErrors.eventDate} />
        </div>

        <div className="space-y-2">
          <FieldLabel htmlFor="eventTime" required>
            Event Time
          </FieldLabel>
          <select
            id="eventTime"
            value={details.eventTime}
            onChange={(e) => updateField("eventTime", e.target.value)}
            className={cn(selectClass, fieldErrors.eventTime && "border-rose-300")}
          >
            <option value="">Select event time</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
          <FieldError message={fieldErrors.eventTime} />
        </div>

        <div className="space-y-2">
          <FieldLabel htmlFor="setupTime" required>
            Preferred Setup Time
          </FieldLabel>
          <select
            id="setupTime"
            value={details.setupTime}
            onChange={(e) => updateField("setupTime", e.target.value)}
            className={cn(selectClass, fieldErrors.setupTime && "border-rose-300")}
          >
            <option value="">Select setup time</option>
            {setupTimeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
          <FieldError message={fieldErrors.setupTime} />
        </div>

        <div className="space-y-2">
          <FieldLabel htmlFor="guestCount" required>
            Number of Guests
          </FieldLabel>
          <Input
            id="guestCount"
            type="number"
            min={1}
            value={details.guestCount}
            onChange={(e) => updateField("guestCount", e.target.value)}
            placeholder="e.g. 25"
          />
          <FieldError message={fieldErrors.guestCount} />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <FieldLabel htmlFor="address" required>
            Complete Venue Address
          </FieldLabel>
          <textarea
            id="address"
            rows={3}
            value={details.address}
            onChange={(e) => updateField("address", e.target.value)}
            placeholder="House / building, street, area"
            className={cn(
              "flex w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100",
              fieldErrors.address && "border-rose-300"
            )}
          />
          <FieldError message={fieldErrors.address} />
        </div>

        <div className="space-y-2">
          <FieldLabel htmlFor="landmark">Landmark</FieldLabel>
          <Input
            id="landmark"
            value={details.landmark}
            onChange={(e) => updateField("landmark", e.target.value)}
            placeholder="Optional"
          />
        </div>

        <div className="space-y-2">
          <FieldLabel htmlFor="pincode" required>
            Pincode
          </FieldLabel>
          <Input
            id="pincode"
            inputMode="numeric"
            maxLength={6}
            value={details.pincode}
            onChange={(e) => updateField("pincode", e.target.value.replace(/\D/g, ""))}
            placeholder="6-digit pincode"
          />
          <FieldError message={fieldErrors.pincode} />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <FieldLabel htmlFor="city" required>
            City
          </FieldLabel>
          <Input
            id="city"
            value={details.city}
            onChange={(e) => updateField("city", e.target.value)}
            placeholder="City"
          />
          <FieldError message={fieldErrors.city} />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <FieldLabel htmlFor="notes">Additional Notes</FieldLabel>
          <textarea
            id="notes"
            rows={3}
            value={details.notes}
            onChange={(e) => updateField("notes", e.target.value)}
            placeholder="Theme preferences, access instructions, etc."
            className="flex w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
          />
        </div>
      </div>

      {formError && (
        <p className="text-sm text-rose-600" role="alert">
          {formError}
        </p>
      )}
    </form>
  );
}
