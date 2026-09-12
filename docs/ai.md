# NEXVION AI Demand + Reliability Engine Specification

**SIH 2026 Problem Statement ID**: 26089  
**Theme**: Agriculture, Foodtech & Rural Development

---

## 1. Engine Philosophy: Explainable, Auditable, Fair

NEXVION strictly avoids black-box "magic scores" or simulated chatbot gimmicks. Every recommendation presented to a customer is supported by an audit trail explaining **WHY** this worker or cooperative was selected.

```
+-------------------------------------------------------------+
|                     CUSTOMER JOB REQUEST                    |
|  - Category: Electrical   - Workers Needed: 4 (Group Hiring)|
|  - Location: GPS (lat/lon)  - Budget: Rs 5,000              |
+------------------------------+------------------------------+
                               |
                               v
+-------------------------------------------------------------+
|                 PHASE 1: CANDIDATE FILTERING                |
|  - Exclude rejected verifications                           |
|  - Exclude candidates beyond Max Radius (default: 50 km)   |
|  - Filter by required skills in roster                      |
|  - Capacity check: cooperative members >= workers_needed    |
+------------------------------+------------------------------+
                               |
                               v
+-------------------------------------------------------------+
|                 PHASE 2: FEATURE EXTRACTION                 |
|  - f_skill: Matched skills / Required skills                |
|  - f_availability: Capacity / Scheduled slot                |
|  - f_distance: 1 - (haversine_dist / max_radius)            |
|  - f_reliability: Platform reliability score / 100          |
|  - f_experience: min(avg_years / 10, 1.0)                   |
|  - f_rating: avg_rating / 5.0                               |
|  - f_verification: Verified=1.0, Pending=0.5, Rejected=0    |
|  - f_wage: Budget compatibility score                       |
+------------------------------+------------------------------+
                               |
                               v
+-------------------------------------------------------------+
|                  PHASE 3: WEIGHTED SCORING                  |
|  Match Score = Sum( w_i * f_i )                             |
|  (Configurable weights; default sum = 1.0)                  |
+------------------------------+------------------------------+
                               |
                               v
+-------------------------------------------------------------+
|                 PHASE 4: EXPLANATION ENGINE                 |
|  Outputs: Match %, sorted ranking, and breakdown items:     |
|   "✓ All required skills available"                         |
|   "✓ Available at requested time (Capacity: 4 workers)"    |
|   "✓ 2.8 km away (Within transit zone)"                     |
|   "✓ Verified cooperative team"                             |
|   "✓ 95% Platform reliability record"                       |
+-------------------------------------------------------------+
```

---

## 2. Configurable Weights

| Factor | Key | Default Weight | Description |
|---|---|---|---|
| Skill Match | `MATCH_WEIGHT_SKILL` | **30%** | Proportion of requested skills present in worker or team |
| Availability | `MATCH_WEIGHT_AVAILABILITY` | **15%** | Calendar slot match & group member capacity |
| Distance | `MATCH_WEIGHT_DISTANCE` | **15%** | Haversine proximity to job GPS |
| Reliability | `MATCH_WEIGHT_RELIABILITY` | **15%** | Historical platform execution score |
| Experience | `MATCH_WEIGHT_EXPERIENCE` | **10%** | Years of verified trade experience |
| Rating | `MATCH_WEIGHT_RATING` | **5%** | Star rating from completed bookings |
| Verification | `MATCH_WEIGHT_VERIFICATION` | **5%** | Skill Passport approval state |
| Wage Compatibility | `MATCH_WEIGHT_WAGE` | **5%** | Customer budget alignment with fair minimums |

---

## 3. Worker & Cooperative Reliability Formula

Reliability is derived strictly from **platform-recorded events** to prevent fraudulent score inflation:

$$\text{Reliability} = \left( 0.30 \cdot C + 0.20 \cdot A + 0.20 \cdot R + 0.15 \cdot P + 0.15 \cdot S \right) \times 100$$

Where:
- $C$ = Completion Rate: $\frac{\text{Completed Jobs}}{\text{Completed} + \text{Cancelled} + \text{No Shows}}$
- $A$ = Attendance Rate: $\frac{\text{On-Time Verified Attendances}}{\text{Total Attendances}}$
- $R$ = Normalized Rating: $\frac{\text{Average Star Rating}}{5.0}$
- $P$ = Cancellation Penalty: $\max(0, 1 - 0.10 \times \text{Cancellations})$
- $S$ = Response Rate: $\frac{\text{Accepted Jobs}}{\text{Offered Jobs}}$

---

## 4. Demand Forecasting Architecture

The demand engine tracks historical density arrays (`demand_history`) containing:
- Spatial clustering (Latitude/Longitude clusters)
- Service categories
- Worker shortages ($\text{workers\_needed} - \text{workers\_available}$)
- Day-of-week and seasonal frequency patterns

The prototype forecasting service computes 7-day rolling trends (`rising`, `stable`, `falling`) to empower worker cooperatives with proactive scheduling, transparently marked as `DEMO FORECAST`.
